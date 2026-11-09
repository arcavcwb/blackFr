import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const pageDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(pageDirectory, '../..');
const astro = path.join(repoRoot, 'node_modules/.bin/astro');
const page = path.join(repoRoot, 'src/pages/black-friday.astro');
const builtPage = path.join(repoRoot, 'dist/black-friday/index.html');

const menuDestinations = ['home', 'sobre', 'como-participar', 'game-da-black', 'regulamento'];

const chrome = process.env.CHROME_BIN ?? '/usr/bin/google-chrome';

/**
 * Minimal DevTools Protocol client for the installed headless Chrome. Using the
 * remote-debugging pipe keeps this browser test self-contained: it neither
 * opens a network port nor adds a browser-test dependency to the package.
 */
async function openBrowser() {
	const profile = await mkdtemp(path.join(tmpdir(), 'black-friday-menu-'));
	const process = spawn(chrome, [
		'--headless=new',
		'--no-sandbox',
		'--disable-gpu',
		'--remote-debugging-pipe',
		`--user-data-dir=${profile}`,
	], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });

	let nextId = 0;
	let buffer = '';
	const pending = new Map();
	process.stdio[4].on('data', (chunk) => {
		buffer += chunk.toString();
		let boundary = buffer.indexOf('\0');
		while (boundary !== -1) {
			const message = JSON.parse(buffer.slice(0, boundary));
			buffer = buffer.slice(boundary + 1);
			const request = pending.get(message.id);
			if (request) {
				pending.delete(message.id);
				message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
			}
			boundary = buffer.indexOf('\0');
		}
	});

	const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
		const id = ++nextId;
		pending.set(id, { resolve, reject });
		process.stdio[3].write(`${JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })}\0`);
	});

	const close = async () => {
		if (!process.killed) {
			process.kill();
			await once(process, 'exit');
		}
		await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
	};
	return { send, close };
}

async function evaluate(send, sessionId, expression) {
	const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
	if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
	return result.result.value;
}


async function reservePort() {
        return new Promise((resolve, reject) => {
                const server = createServer();
                server.once('error', reject);
                server.listen(0, '127.0.0.1', () => {
                        const address = server.address();
                        if (!address || typeof address === 'string') {
                                server.close();
                                reject(new Error('Could not reserve a local TCP port'));
                                return;
                        }
                        server.close((error) => {
                                if (error) reject(error);
                                else resolve(address.port);
                        });
                });
        });
}

async function startPreview() {
        const port = await reservePort();
        const child = spawn(astro, [
                'preview',
                '--host', '127.0.0.1',
                '--port', String(port),
        ], {
                cwd: repoRoot,
                stdio: ['ignore', 'pipe', 'pipe'],
        });

        let logs = '';
        child.stdout.on('data', chunk => { logs += chunk.toString(); });
        child.stderr.on('data', chunk => { logs += chunk.toString(); });

        const url = `http://127.0.0.1:${port}`;

        const close = async () => {
                if (child.exitCode !== null || child.signalCode !== null) return;
                const exited = once(child, 'exit');
                child.kill('SIGTERM');
                await exited;
        };

        const deadline = Date.now() + 15000;

        while (Date.now() < deadline) {
                if (child.exitCode !== null || child.signalCode !== null) {
                        throw new Error(`Astro preview exited early:\n${logs}`);
                }

                try {
                        const response = await fetch(`${url}/black-friday/`, {
                                signal: AbortSignal.timeout(1000),
                        });
                        if (response.ok) return { url, close };
                } catch {}

                await new Promise(resolve => setTimeout(resolve, 100));
        }

        await close();
        throw new Error(`Astro preview did not become ready at ${url}:\n${logs}`);
}

test('Black Friday page renders the canonical navigation and interaction contracts', async () => {
	execFileSync(astro, ['build'], { cwd: repoRoot, stdio: 'inherit' });

	const [html, source] = await Promise.all([
		readFile(builtPage, 'utf8'),
		readFile(page, 'utf8'),
	]);
	const cssHref = html.match(/<link rel="stylesheet" href="([^\"]+black-friday\.[^\"]+\.css)">/)?.[1];
	assert.ok(cssHref, 'the built route must load its generated stylesheet');
	const css = await readFile(path.join(repoRoot, 'dist', cssHref.slice(1)), 'utf8');

	assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'the integrated page must expose one h1');
	assert.match(html, /<a class="skip-link" href="#conteudo"[^>]*>Pular para o conteúdo<\/a>/);
	assert.match(html, /<main id="conteudo" tabindex="-1"/);
	assert.match(html, /<video\b[^>]*\bcontrols\b/);
	assert.equal((html.match(/<details\b/g) ?? []).length, 4, 'the FAQ must remain natively usable without JavaScript');

	for (const destination of menuDestinations) {
		const links = html.match(new RegExp(`href="#${destination}"`, 'g')) ?? [];
		assert.equal(links.length, 3, `${destination} must exist in desktop, mobile, and no-JS navigation`);
		assert.match(html, new RegExp(`<[^>]+id="${destination}"`));
	}

	assert.match(html, /<button[^>]+aria-expanded="false"[^>]+aria-controls="bf-menu-movel"[^>]+data-menu-botao/);
	assert.match(html, /<dialog\b[^>]+id="bf-menu-movel"[^>]+aria-label="Menu"[^>]+data-menu-gaveta/);
	assert.match(html, /aria-label="Fechar o menu"[^>]+data-menu-fechar/);
	assert.match(html, /<noscript><nav class="no-script-menu md:hidden"/);
	assert.match(html, /<noscript><style>\.mobile-menu \{ display: none; \}<\/style><\/noscript>/);

	// This page intentionally uses a small native script instead of a hydrated
	// framework island. Retain guards for the implementation contracts while the
	// browser test below executes the actual interactions.
	for (const behaviour of [
		/scrollY > 80/,
		/requestAnimationFrame\(marcar\)/,
		/"IntersectionObserver" in window/,
		/setAttribute\("aria-current", "true"\)/,
		/gaveta\.showModal\(\)/,
		/gaveta\.close\(\)/,
		/history\.replaceState\(null, "", href\)/,
		/scrollIntoView\(\{ behavior: reduzir\.matches \? "auto" : "smooth" \}\)/,
		/setAttribute\("tabindex", "-1"\)/,
		/focus\(\{ preventScroll: true \}\)/,
		/matchMedia\("\(min-width: 768px\)"\)/,
	]) {
		assert.match(source, behaviour);
	}

	assert.match(css, /@media \(width>=48rem\)\{\.md\\:flex\{display:flex\}\.md\\:hidden\{display:none\}/);
});

test('Black Friday mobile menu executes its dialog, anchor, focus, history, and desktop-close behaviours', async (t) => {
	const preview = await startPreview();
        t.after(() => preview.close());
        const browser = await openBrowser();
	t.after(() => browser.close());

	const target = await browser.send('Target.createTarget', { url: 'about:blank' });
	const attached = await browser.send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
	const sessionId = attached.sessionId;
	await browser.send('Page.enable', {}, sessionId);
	await browser.send('Emulation.setDeviceMetricsOverride', {
		width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
	}, sessionId);
	await browser.send('Page.navigate', { url: `${preview.url}/black-friday/` }, sessionId);
	await evaluate(browser.send, sessionId, 'document.readyState === "complete" ? undefined : new Promise((resolve) => addEventListener("load", resolve, { once: true }))');

	const state = async () => evaluate(browser.send, sessionId, `(() => {
		const button = document.querySelector('[data-menu-botao]');
		const dialog = document.querySelector('[data-menu-gaveta]');
		return { open: dialog.open, expanded: button.getAttribute('aria-expanded') };
	})()`);
	const waitForClosed = () => evaluate(browser.send, sessionId, `new Promise((resolve) => {
		const dialog = document.querySelector('[data-menu-gaveta]');
		const button = document.querySelector('[data-menu-botao]');
		const check = () => !dialog.open && button.getAttribute('aria-expanded') === 'false';
		if (check()) return resolve();
		dialog.addEventListener('close', () => requestAnimationFrame(resolve), { once: true });
	})`);

	await evaluate(browser.send, sessionId, "document.querySelector('[data-menu-botao]').click()");
	assert.deepEqual(await state(), { open: true, expanded: 'true' }, 'the menu button opens the dialog and exposes its state');

	await evaluate(browser.send, sessionId, "document.querySelector('[data-menu-fechar]').click()");
	await waitForClosed();
	assert.deepEqual(await state(), { open: false, expanded: 'false' }, 'the close control restores the collapsed state');

	await evaluate(browser.send, sessionId, "document.querySelector('[data-menu-botao]').click(); document.querySelector('[data-menu-gaveta] a[href=\"#sobre\"]').click()");
	await waitForClosed();
	assert.deepEqual(await evaluate(browser.send, sessionId, `(() => ({
		open: document.querySelector('[data-menu-gaveta]').open,
		hash: location.hash,
		focus: document.activeElement?.id,
		tabindex: document.querySelector('#sobre')?.getAttribute('tabindex'),
	}))()`), {
		open: false, hash: '#sobre', focus: 'sobre', tabindex: '-1',
	}, 'an in-menu anchor closes the dialog, updates history, and moves focus to its section');

	await evaluate(browser.send, sessionId, "document.querySelector('[data-menu-botao]').click()");
	await browser.send('Emulation.setDeviceMetricsOverride', {
		width: 768, height: 844, deviceScaleFactor: 1, mobile: false,
	}, sessionId);
	await waitForClosed();
	assert.deepEqual(await state(), { open: false, expanded: 'false' }, 'crossing the desktop breakpoint closes an open mobile dialog');
});
