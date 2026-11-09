import assert from 'node:assert/strict';
import test from 'node:test';
import { mountKeyVisualMotion } from './kv.ts';

function withBrowser(run) {
  const previousWindow = globalThis.window;
  const previousLocation = globalThis.location;
  globalThis.window = new EventTarget();
  globalThis.location = { hash: '' };
  try { run(); }
  finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousLocation === undefined) delete globalThis.location;
    else globalThis.location = previousLocation;
  }
}

function fixture(wrapper = { getAttribute: () => null }) {
  return { querySelector: (selector) => {
    assert.equal(selector, '[data-motion-gdb-kv]');
    return wrapper;
  } };
}

test('reveals only the intact KV wrapper and disposes once', () => withBrowser(() => {
  const wrapper = { getAttribute: () => null };
  const calls = [];
  let releases = 0;
  const dispose = mountKeyVisualMotion(fixture(wrapper), (target, options) => {
    calls.push([target, options]);
    return () => { releases++; };
  });
  assert.deepEqual(calls, [[wrapper, { distance: 16, duration: 0.5 }]]);
  dispose();
  dispose();
  window.dispatchEvent(new Event('hashchange'));
  assert.equal(releases, 1);
}));

test('missing KV wrapper leaves motion unregistered', () => withBrowser(() => {
  let called = false;
  const dispose = mountKeyVisualMotion(fixture(null), () => { called = true; return () => {}; });
  dispose();
  assert.equal(called, false);
}));

test('current and arriving KV anchors bypass or cancel the reveal', () => withBrowser(() => {
  location.hash = '#game-da-black';
  let calls = 0;
  mountKeyVisualMotion(fixture(), () => { calls++; return () => {}; })();
  assert.equal(calls, 0);

  location.hash = '';
  let releases = 0;
  const dispose = mountKeyVisualMotion(fixture(), () => {
    calls++;
    return () => { releases++; };
  });
  location.hash = '#other';
  window.dispatchEvent(new Event('hashchange'));
  assert.equal(releases, 0);
  location.hash = '#game-da-black';
  window.dispatchEvent(new Event('hashchange'));
  dispose();
  assert.equal(calls, 1);
  assert.equal(releases, 1);
}));

test('failed reveal restores the wrapper style and reports context', () => withBrowser(() => {
  let style = 'transform: translateX(2px)';
  const wrapper = {
    getAttribute: () => style,
    setAttribute: (_name, value) => { style = value; },
    removeAttribute: () => { style = null; },
  };
  const previousError = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  try {
    const dispose = mountKeyVisualMotion(fixture(wrapper), () => {
      style = 'transform: translateY(16px)';
      throw new Error('injected reveal failure');
    });
    dispose();
    assert.equal(style, 'transform: translateX(2px)');
    assert.match(errors[0][0], /Game da Black key visual motion registration failed/);
    assert.match(errors[0][1].message, /injected reveal failure/);
  } finally { console.error = previousError; }
}));
