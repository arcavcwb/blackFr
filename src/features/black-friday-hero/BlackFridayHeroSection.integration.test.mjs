import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const featureDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(featureDirectory, '../../..');
const fixtureFiles = [
	'src/features/black-friday-hero/components',
	'src/data/landing-content.ts',
	'content/landing-content.json',
	'assets/originals/hero/hero-fundo-figma-v04.png',
	'assets/originals/hero/hero-apresentadora-v04.png',
	'assets/originals/hero/hero-titulo-black-todo-dia-v04.png',
	'assets/optimized/video/video-black-friday-2026.mp4',
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const assertLabelledSection = (html, sectionId, heading) => {
	const headingId = `${sectionId}-title`;
	assert.match(
		html,
		new RegExp(
			`<section\\b(?=[^>]*\\bid="${escapeRegExp(sectionId)}")(?=[^>]*\\baria-labelledby="${escapeRegExp(headingId)}")[^>]*>`,
		),
	);
	assert.match(
		html,
		new RegExp(
			`<h1\\b(?=[^>]*\\bid="${escapeRegExp(headingId)}")[^>]*>${escapeRegExp(heading)}</h1>`,
		),
	);
};

test('BlackFridayHeroSection renders accessible IDs and a bundled video with native controls', async () => {
	const fixture = await mkdtemp(path.join(os.tmpdir(), 'black-friday-hero-'));

	try {
		// Keep components inside the fixture root so Astro can bundle their scripts.
		for (const file of fixtureFiles) {
			const destination = path.join(fixture, file);
			await mkdir(path.dirname(destination), { recursive: true });
			await cp(path.join(repoRoot, file), destination, { recursive: true });
		}
		await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
		await symlink(path.join(repoRoot, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
		await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
		await writeFile(
			path.join(fixture, 'astro.config.mjs'),
			`import { defineConfig } from 'astro/config';
export default defineConfig({});
`,
		);
		await writeFile(
			path.join(fixture, 'src/pages/index.astro'),
			`---
import BlackFridayHeroSection from '../features/black-friday-hero/components/BlackFridayHeroSection.astro';
---
<BlackFridayHeroSection />
<BlackFridayHeroSection heroId="campaign-hero" videoId="campaign-video" />
`,
		);

		execFileSync(path.join(repoRoot, 'node_modules/.bin/astro'), ['build', '--root', fixture], {
			cwd: fixture,
			stdio: 'inherit',
		});

		const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		assertLabelledSection(html, 'home', 'Black Todo Dia é no Condor. Aqui a Black não para.');
		assertLabelledSection(
			html,
			'campaign-hero',
			'Black Todo Dia é no Condor. Aqui a Black não para.',
		);
		assert.match(html, /<section\b(?=[^>]*\bid="black-friday-video")[^>]*>/);
		assert.match(html, /<section\b(?=[^>]*\bid="campaign-video")[^>]*>/);

		const videoTags = [...html.matchAll(/<video\b[^>]*>/g)].map(([tag]) => tag);
		assert.equal(videoTags.length, 2);
		videoTags.forEach((tag) => {
			assert.match(tag, /\bcontrols(?:="")?(?=\s|>)/);
			assert.match(tag, /\bmuted(?:="")?(?=\s|>)/);
			assert.match(tag, /\bplaysinline(?:="")?(?=\s|>)/);
			assert.match(tag, /\bpreload="metadata"/);
		});

		const bundledSources = [
			...html.matchAll(/<source\b[^>]*\bsrc="([^"]+)"[^>]*\btype="video\/mp4"[^>]*>/g),
		].map(([, source]) => source);
		assert.equal(bundledSources.length, 2);

		for (const source of new Set(bundledSources)) {
			assert.match(source, /^\/_astro\/video-black-friday-2026\.[^/]+\.mp4$/);
			const bundledFile = await stat(path.join(fixture, 'dist', source.slice(1)));
			assert.ok(bundledFile.size > 0, 'the emitted promotional video must not be empty');
		}
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
