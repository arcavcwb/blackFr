import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import content from '../../../../content/landing-content.json' with { type: 'json' };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
test('Game da Black renders the canonical four steps, conditional bonus and original KV', async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), 'gdb-render-'));
  try {
    await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
    await cp(path.join(root, 'src/features/game-da-black'), path.join(fixture, 'src/features/game-da-black'), { recursive: true });
    await cp(path.join(root, 'src/assets/game-da-black'), path.join(fixture, 'src/assets/game-da-black'), { recursive: true });
    await cp(path.join(root, 'src/data'), path.join(fixture, 'src/data'), { recursive: true });
    await cp(path.join(root, 'content'), path.join(fixture, 'content'), { recursive: true });
    await cp(path.join(root, 'assets/originals'), path.join(fixture, 'assets/originals'), { recursive: true });
    await symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
    await writeFile(path.join(fixture, 'package.json'), '{"type":"module"}');
    await writeFile(path.join(fixture, 'astro.config.mjs'), "import { defineConfig } from 'astro/config'; export default defineConfig({});");
    await writeFile(path.join(fixture, 'src/pages/index.astro'), `---\nimport GameDaBlack from ${JSON.stringify(path.join(fixture, 'src/features/game-da-black/components/GameDaBlack.astro'))};\n---\n<GameDaBlack />`);
    await writeFile(path.join(fixture, 'src/pages/optional-fields.astro'), `---\nimport GameStepCard from '../features/game-da-black/components/GameStepCard.astro';\nimport illustration from '../assets/game-da-black/illustration-step-1.png';\nconst step = { number: 1, title: 'Teste', description: 'Descrição', illustration, result: 'Resultado **preservado**', bonus: 'Bônus **condicional**' };\n---\n<GameStepCard step={step} />`);
    execFileSync(path.join(root, 'node_modules/.bin/astro'), ['build', '--root', fixture], { cwd: fixture, stdio: 'inherit' });
    const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
    const text = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    assert.match(html, /gdb-key-visual-v03[^" ]*\.png/);
    assert.match(html, /logo-condor-com-sombra/);
    assert.match(html, /gdb-logo-original/);
    assert.equal((html.match(/<li\b/g) ?? []).length, 4);
    for (const [index, step] of content.game.passos.itens.entries()) {
      assert.match(html, new RegExp(`illustration-step-${index + 1}\\.`));
      assert.ok(text.includes(step.titulo), step.titulo);
      assert.ok(text.includes(step.descricao.replaceAll('**', '').replace(/\s+/g, ' ')), step.descricao);
    }
    assert.match(html, /class="bonus"/);
    assert.ok(text.includes('quando houver bônus'));
    assert.doesNotMatch(html, /controlador\.js/);
    const optionalHtml = await readFile(path.join(fixture, 'dist/optional-fields/index.html'), 'utf8');
    assert.match(optionalHtml, /Resultado\s*<strong[^>]*>preservado<\/strong>/);
    assert.match(optionalHtml, /Bônus\s*<strong[^>]*>condicional<\/strong>/);
  } finally { await rm(fixture, { recursive: true, force: true }); }
});
