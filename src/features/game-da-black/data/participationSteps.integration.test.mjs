import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import landingContent from '../../../../content/landing-content.json' with { type: 'json' };

const dataDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dataDirectory, '../../../..');
const participationStepsModule = path.join(dataDirectory, 'participationSteps.ts');

test('participation steps preserve canonical instructions and their presentation metadata', async () => {
	const fixture = await mkdtemp(path.join(os.tmpdir(), 'black-friday-game-steps-'));
	const expectedSteps = landingContent.game.passos.itens;

	try {
		await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
		await symlink(path.join(repoRoot, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
		await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
		await writeFile(path.join(fixture, 'astro.config.mjs'), `
import { defineConfig } from 'astro/config';
export default defineConfig({});
`);
		await writeFile(path.join(fixture, 'src/pages/index.astro'), `
---
import { participationSteps } from ${JSON.stringify(participationStepsModule)};
---
<ol>
  {participationSteps.map((step) => (
    <li data-step={step.number} data-illustration={step.illustration.src}>
      <h2>{step.title}</h2>
      <p>{step.description}</p>
    </li>
  ))}
</ol>
`);

		execFileSync(path.join(repoRoot, 'node_modules/.bin/astro'), ['build', '--root', fixture], {
			cwd: fixture,
			stdio: 'inherit',
		});

		const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		assert.equal(expectedSteps.length, 4);
		assert.equal((html.match(/data-step=/g) ?? []).length, 4);

		expectedSteps.forEach((step, index) => {
			const number = index + 1;
			assert.match(html, new RegExp(`data-step="${number}"`));
			assert.match(html, new RegExp(`illustration-step-${number}\\.`));
			assert.ok(html.includes(step.titulo), `step ${number} title must remain canonical`);
			assert.ok(html.includes(step.descricao), `step ${number} description must remain canonical`);
		});

		const thirdStep = expectedSteps[2].descricao;
		assert.match(thirdStep, /3 produtos diferentes/);
		assert.match(thirdStep, /1 número da sorte/);
		assert.match(thirdStep, /5 produtos/);
		assert.match(thirdStep, /quando houver bônus/);
		assert.ok(html.includes(thirdStep), 'step 3 must retain its result and conditional bonus');
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
