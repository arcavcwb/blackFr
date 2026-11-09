import assert from 'node:assert/strict';
import test from 'node:test';
import { gsap } from 'gsap';
import { mountHeroMotion } from './index.ts';

test('missing hero layer leaves the original artwork untouched', () => {
  const root = { querySelector: () => null };
  assert.equal(typeof mountHeroMotion(root), 'function');
});

test('reduced motion never prepares the three hero layers', () => {
  const images = new Map([
    ['[data-motion-hero-background]', new EventTarget()],
    ['[data-motion-hero-title]', new EventTarget()],
    ['[data-motion-hero-presenter]', new EventTarget()],
  ]);
  for (const image of images.values()) { image.complete = true; image.naturalWidth = 100; image.style = {}; }
  const root = new EventTarget();
  root.querySelector = (selector) => images.get(selector);
  root.id = 'home';
  const media = new EventTarget(); media.matches = true;
  globalThis.window = new EventTarget();
  window.matchMedia = () => media;
  globalThis.location = { hash: '' };
  const dispose = mountHeroMotion(root);
  assert.deepEqual([...images.values()].map((image) => image.style), [{}, {}, {}]);
  dispose();
});

test('timeline setup failure restores the hero and reports its cause', () => {
  const previous = {
    window: globalThis.window,
    document: globalThis.document,
    location: globalThis.location,
    timeline: gsap.timeline,
    error: console.error,
  };
  const images = new Map([
    ['[data-motion-hero-background]', new EventTarget()],
    ['[data-motion-hero-title]', new EventTarget()],
    ['[data-motion-hero-presenter]', new EventTarget()],
  ]);
  for (const image of images.values()) {
    image.complete = true;
    image.naturalWidth = 100;
    image.style = { transform: 'translateX(2px)' };
  }
  const root = new EventTarget();
  root.id = 'home';
  root.querySelector = (selector) => images.get(selector);
  root.getBoundingClientRect = () => ({ bottom: 400 });
  root.contains = () => false;
  const media = new EventTarget();
  media.matches = false;
  globalThis.window = new EventTarget();
  window.matchMedia = () => media;
  globalThis.document = { activeElement: null };
  globalThis.location = { hash: '' };
  const failure = new Error('injected timeline failure');
  const errors = [];
  gsap.timeline = () => { throw failure; };
  console.error = (...args) => errors.push(args);
  try {
    const dispose = mountHeroMotion(root);
    dispose();
    assert.deepEqual([...images.values()].map((image) => image.style.transform),
      ['translateX(2px)', 'translateX(2px)', 'translateX(2px)']);
    assert.equal(errors.length, 1);
    assert.match(errors[0][0], /Black Friday hero motion setup failed/);
    assert.equal(errors[0][1], failure);
  } finally {
    gsap.timeline = previous.timeline;
    console.error = previous.error;
    for (const key of ['window', 'document', 'location']) {
      if (previous[key] === undefined) delete globalThis[key];
      else globalThis[key] = previous[key];
    }
  }
});
