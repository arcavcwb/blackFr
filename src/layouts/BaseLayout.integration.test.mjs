import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('BaseLayout renders document metadata and Tailwind emits custom theme utilities', async () => {
	const fixture = await mkdtemp(path.join(os.tmpdir(), 'black-friday-layout-'));
	try {
		await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
		await symlink(path.join(repoRoot, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
		await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
		await writeFile(path.join(fixture, 'astro.config.mjs'), `
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ vite: { plugins: [tailwindcss()] } });
`);
		await writeFile(path.join(fixture, 'src/pages/index.astro'), `
---
import BaseLayout from ${JSON.stringify(path.join(repoRoot, 'src/layouts/BaseLayout.astro'))};
---
<BaseLayout title="Layout check" description="Optional description" lang="es">
  <main class="bg-gdb-card-start">Rendered content</main>
</BaseLayout>
`);

		execFileSync(path.join(repoRoot, 'node_modules/.bin/astro'), ['build', '--root', fixture], {
			cwd: fixture,
			stdio: 'inherit',
		});

		const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		assert.match(html, /<html lang="es">/);
		assert.match(html, /<title>Layout check<\/title>/);
		assert.match(html, /<meta name="description" content="Optional description"/);
		assert.match(html, /Rendered content/);

		const css = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		assert.match(css, /\.bg-gdb-card-start\s*\{/);
		assert.match(css, /background-color:\s*var\(--color-gdb-card-start\)/);
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
