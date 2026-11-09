import test from 'node:test';
import assert from 'node:assert/strict';
import { registerReveal } from './core.ts';

function setup({ reduced = false, top = 900, hash = '' } = {}) {
  const media = new EventTarget(); media.matches = reduced;
  const win = new EventTarget(); win.innerHeight = 1000; win.matchMedia = () => media;
  const doc = new EventTarget(); doc.activeElement = null;
  const target = new EventTarget(); target.isConnected = true; target.getBoundingClientRect = () => ({ top });
  target.contains = (el) => el === target || el === child;
  const child = {}; doc.getElementById = (id) => id === 'child' ? child : null;
  globalThis.window = win; globalThis.document = doc; globalThis.location = { hash, href: 'https://example.test/page', origin: 'https://example.test', pathname: '/page', search: '' };
  let enter, complete, kills = 0, reverts = 0, starts = 0, watches = 0;
  const driver = {
    watch(_target, callback) { watches++; enter = callback; return { kill() { kills++; } }; },
    animate(_target, _options, callback) { starts++; complete = callback; return { revert() { reverts++; } }; },
  };
  return { target, media, win, doc, driver, enter: () => enter(), complete: () => complete(), stats: () => ({ kills, reverts, starts, watches }) };
}

test('waits visibly for the trigger, runs once and restores previous styles', () => {
  const s = setup(); const dispose = registerReveal(s.target, s.driver);
  assert.equal(s.stats().starts, 0); s.enter(); assert.equal(s.stats().starts, 1);
  s.complete(); assert.equal(s.stats().reverts, 1); s.enter(); assert.equal(s.stats().starts, 1);
  dispose(); dispose(); assert.equal(s.stats().reverts, 1);
});
test('initially visible and anchor targets are never animated', () => {
  for (const opts of [{ top: 850 }, { hash: '#child' }]) {
    const s = setup(opts); const dispose = registerReveal(s.target, s.driver);
    assert.equal(s.stats().watches, 0); dispose();
  }
});
test('reduced motion changes and focus cancel active motion', () => {
  for (const event of ['change', 'focusin', 'hashchange']) {
    const s = setup(); const dispose = registerReveal(s.target, s.driver); s.enter();
    if (event === 'change') { s.media.matches = true; s.media.dispatchEvent(new Event(event)); }
    else if (event === 'focusin') s.target.dispatchEvent(new Event(event));
    else { location.hash = '#child'; s.win.dispatchEvent(new Event(event)); }
    assert.equal(s.stats().reverts, 1); dispose();
  }
});
test('clicks alone do not cancel motion; actual hash navigation does', () => {
  const s = setup(); const dispose = registerReveal(s.target, s.driver);
  for (const options of [{ ctrlKey: true }, { metaKey: true }, { button: 1 }, {}]) {
    const click = new Event('click', { cancelable: true });
    Object.assign(click, options);
    if (!Object.keys(options).length) click.preventDefault();
    s.doc.dispatchEvent(click);
    assert.equal(s.stats().kills, 0);
  }
  location.hash = '#child'; s.win.dispatchEvent(new Event('hashchange'));
  assert.equal(s.stats().kills, 1);
  s.enter(); assert.equal(s.stats().starts, 0);
  dispose();
});
test('initial reduced preference can be switched off, without replay after cancellation', () => {
  const s = setup({ reduced: true }); const dispose = registerReveal(s.target, s.driver);
  assert.equal(s.stats().watches, 0); s.media.matches = false; s.media.dispatchEvent(new Event('change'));
  assert.equal(s.stats().watches, 1); s.media.matches = true; s.media.dispatchEvent(new Event('change'));
  s.media.matches = false; s.media.dispatchEvent(new Event('change')); assert.equal(s.stats().watches, 1); dispose();
});
test('watch errors propagate and failed initialization removes listeners', () => {
  const s = setup(); const error = new Error('watch failed');
  s.driver.watch = () => { throw error; };
  assert.throws(() => registerReveal(s.target, s.driver), (caught) => caught === error);
  s.media.matches = false;
  s.media.dispatchEvent(new Event('change'));
  assert.equal(s.stats().watches, 0);
});
test('animation errors propagate after the trigger is killed', () => {
  const s = setup(); const error = new Error('animation failed');
  s.driver.animate = () => { throw error; };
  const dispose = registerReveal(s.target, s.driver);
  assert.throws(() => s.enter(), (caught) => caught === error);
  assert.equal(s.stats().kills, 1);
  s.enter();
  dispose();
});
