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
const contactsModule = path.join(dataDirectory, 'contacts.ts');
const faqModule = path.join(dataDirectory, 'faqs-preview.ts');

test('bottom section mappings preserve canonical FAQ and contact data', async () => {
	const fixture = await mkdtemp(path.join(os.tmpdir(), 'black-friday-bottom-'));
	try {
		await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
		await symlink(path.join(repoRoot, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
		await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
		await writeFile(path.join(fixture, 'astro.config.mjs'), `import { defineConfig } from 'astro/config'; export default defineConfig({});`);
		await writeFile(path.join(fixture, 'src/pages/index.astro'), `
---
import { contactItems } from ${JSON.stringify(contactsModule)};
import { faqPreviewItems } from ${JSON.stringify(faqModule)};
---
<section><ul>{contactItems.map((contact) => <li data-id={contact.id} data-icon={contact.icon}>
<h2>{contact.heading}</h2>{contact.description && <p data-description>{contact.description}</p>}
{contact.links.map((link) => <a href={link.href}>{link.label}</a>)}
</li>)}</ul><div>{faqPreviewItems.map((faq) => <article data-id={faq.id}>
<h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section>`);
		execFileSync(path.join(repoRoot, 'node_modules/.bin/astro'), ['build', '--root', fixture], { cwd: fixture, stdio: 'inherit' });
		const html = await readFile(path.join(fixture, 'dist/index.html'), 'utf8');
		assert.equal(landingContent.canais.cartoes.length, 2);
		landingContent.canais.cartoes.forEach((card, index) => {
			const id = `contact-${index + 1}`;
			assert.match(html, new RegExp(`data-id="${id}"`));
			assert.match(html, new RegExp(`data-icon="${index === 0 ? 'headset' : 'phone'}"`));
			assert.ok(html.includes(card.titulo));
			if (card.subtitulo) {
				assert.ok(html.includes(card.subtitulo));
				assert.match(html, /data-description/);
			} else {
				const contactMarkup = html.split(`data-id="${id}"`)[1].split('</li>')[0];
				assert.doesNotMatch(contactMarkup, /data-description/);
			}
			card.contatos.forEach(({ rotulo, href }) => {
				assert.ok(html.includes(rotulo));
				assert.ok(html.includes(`href="${href}"`));
			});
		});
		landingContent.faq.itens.forEach((faq, index) => {
			assert.match(html, new RegExp(`data-id="faq-${index + 1}"`));
			assert.ok(html.includes(faq.pergunta));
			assert.ok(html.includes(faq.resposta));
		});
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
