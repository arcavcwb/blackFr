import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import landingContent from '../../../content/landing-content.json' with { type: 'json' };

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const fixtureFiles = [
	'src/features/condor-premia/components/CondorPremiaSection.astro',
	'src/features/z-on/components/ZonSection.astro',
	'src/data/landing-content.ts',
	'content/landing-content.json',
	'assets/originals/condor-premia/premios/composicao-premios-fornecida.png',
	'assets/originals/condor-premia/aviso/icone-alerta-exclamacao.png',
	'assets/originals/branding/logo-clube-condor-fornecido-96px.png',
	'assets/derived/condor-premia/premios/premio-01-500-mil-reais.png',
	'assets/derived/condor-premia/premios/premio-02-30-vales-compras.png',
	'assets/derived/condor-premia/premios/premio-03-um-ano-supermercado-gratis.png',
	'assets/derived/condor-premia/passos/cards-completos/passo-01-cadastre-se.png',
	'assets/derived/condor-premia/passos/cards-completos/passo-02-faca-compras.png',
	'assets/derived/condor-premia/passos/cards-completos/passo-03-numeros-da-sorte.png',
	'assets/derived/condor-premia/passos/cards-completos/passo-04-pronto.png',
];

test('Condor Premia and Z-ON render the canonical campaign content', async () => {
	const fixture = await mkdtemp(path.join(os.tmpdir(), 'black-friday-premia-zon-'));
	const canonical = landingContent.comoParticipar;

	try {
		for (const file of fixtureFiles) {
			const destination = path.join(fixture, file);
			await mkdir(path.dirname(destination), { recursive: true });
			await cp(path.join(repoRoot, file), destination);
		}
		await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
		await symlink(path.join(repoRoot, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
		await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
		await writeFile(path.join(fixture, 'astro.config.mjs'), `
import { defineConfig } from 'astro/config';
export default defineConfig({});
`);
		await writeFile(path.join(fixture, 'src/pages/index.astro'), `
---
import CondorPremiaSection from '../features/condor-premia/components/CondorPremiaSection.astro';
import ZonSection from '../features/z-on/components/ZonSection.astro';
---
<CondorPremiaSection />
<ZonSection />
`);

		execFileSync(path.join(repoRoot, 'node_modules/.bin/astro'), ['build', '--root', fixture], {
			cwd: fixture,
			stdio: 'inherit',
		});

		const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		const normalizedHtml = html.replace(/\s+/g, ' ');
		const normalized = (value) => value.replace(/\s+/g, ' ');
		const steps = [...html.matchAll(/<li class="premia__step[^"]*"[^>]*>([\s\S]*?)<\/li>/g)];

		assert.match(html, /<section[^>]+aria-label="Condor Premia"/);
		assert.ok(normalizedHtml.includes(normalized(landingContent.sobre.premiosAlt)));
		assert.match(html, /composicao-premios-fornecida\.[^" ]+/);
		for (const prize of ['premio-01-500-mil-reais', 'premio-02-30-vales-compras', 'premio-03-um-ano-supermercado-gratis']) {
			assert.ok(html.includes(prize), `the supplied prize ${prize} must be rendered`);
		}

		assert.equal(steps.length, 4);
		assert.ok(normalizedHtml.includes(normalized(canonical.titulo)));
		canonical.passos.forEach((step, index) => {
			const cardHtml = normalized(steps[index][1]);
			assert.ok(cardHtml.includes(normalized(step.titulo)), `step ${index + 1} title must remain canonical`);
			assert.ok(cardHtml.includes(normalized(step.descricao)), `step ${index + 1} description must remain canonical`);
			assert.ok(cardHtml.includes(`passo-0${index + 1}-`), `step ${index + 1} supplied card must be rendered`);
		});
		assert.match(steps[0][1], /<a[^>]+class="premia__app-link[^"]*"[^>]+href="https:\/\/clubecondor\.com\/"/);
		assert.ok(normalizedHtml.includes(canonical.passos[0].cta.rotulo));

		assert.ok(normalizedHtml.includes(normalized(canonical.zon)));
		assert.ok(normalizedHtml.includes(normalized(canonical.aviso.texto)));
		assert.ok(normalizedHtml.includes(normalized(canonical.aviso.destaque)));
		assert.match(html, /<aside[^>]+aria-label="Aviso sobre cadastro"/);
		assert.ok(html.includes('icone-alerta-exclamacao'));
		assert.ok(html.includes('logo-clube-condor-fornecido-96px'));
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
