import test from 'node:test';
import assert from 'node:assert/strict';
import {
  setupGameCardMotion,
  setupResponsiveGameCardMotion,
} from './setup.ts';

function fixture(count = 4) {
  const cards = Array.from({ length: count }, (_, index) => ({ id: `card-${index + 1}` }));
  const group = { id: 'group' };
  const root = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-gdb-motion-card]');
      return cards;
    },
    querySelector(selector) {
      assert.equal(selector, '[data-gdb-motion-group]');
      return group;
    },
  };
  return { cards, group, root };
}

test('desktop registers one ordered sequence with the documented total timing', () => {
  const { cards, group, root } = fixture();
  const calls = [];
  const cleanup = setupGameCardMotion(root, true, (trigger, targets, options) => {
    calls.push({ trigger, targets, options });
    return () => {};
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].trigger, group);
  assert.deepEqual(calls[0].targets, cards);
  assert.deepEqual(calls[0].options, { distance: 16, duration: 0.45, stagger: 0.1 });
  assert.equal(calls[0].options.duration + (cards.length - 1) * calls[0].options.stagger, 0.75);
  cleanup();
});

test('compact layouts register one independent reveal per card', () => {
  const { cards, root } = fixture();
  const calls = [];
  let disposed = 0;
  const cleanup = setupGameCardMotion(root, false, (trigger, targets, options) => {
    calls.push({ trigger, targets, options });
    return () => { disposed += 1; };
  });

  assert.equal(calls.length, 4);
  for (let index = 0; index < cards.length; index += 1) {
    assert.equal(calls[index].trigger, cards[index]);
    assert.deepEqual(calls[index].targets, [cards[index]]);
    assert.deepEqual(calls[index].options, { distance: 12, duration: 0.4, stagger: 0 });
  }
  cleanup();
  cleanup();
  assert.equal(disposed, 4);
});

test('partial setup failure rolls back prior card registrations', () => {
  const { root } = fixture();
  let registrations = 0;
  let disposed = 0;
  assert.throws(() => setupGameCardMotion(root, false, () => {
    registrations += 1;
    if (registrations === 3) throw new Error('injected failure');
    return () => { disposed += 1; };
  }), /injected failure/);
  assert.equal(disposed, 2);
});

test('crossing 1280px replaces compact registrations with the desktop sequence', () => {
  const { cards, group, root } = fixture();
  const listeners = new Set();
  const layout = {
    matches: false,
    addEventListener(type, listener) {
      assert.equal(type, 'change');
      listeners.add(listener);
    },
    removeEventListener(type, listener) {
      assert.equal(type, 'change');
      listeners.delete(listener);
    },
  };
  const calls = [];
  const disposed = [];
  const cleanup = setupResponsiveGameCardMotion(root, layout, (trigger, targets, options) => {
    const registration = calls.length;
    calls.push({ trigger, targets, options });
    return () => { disposed.push(registration); };
  });

  assert.equal(listeners.size, 1);
  assert.equal(calls.length, 4);

  listeners.forEach((listener) => listener({ matches: true }));

  assert.deepEqual(disposed, [3, 2, 1, 0]);
  assert.equal(calls.length, 5);
  assert.equal(calls[4].trigger, group);
  assert.deepEqual(calls[4].targets, cards);
  assert.deepEqual(calls[4].options, { distance: 16, duration: 0.45, stagger: 0.1 });

  cleanup();
  cleanup();
  assert.equal(listeners.size, 0);
  assert.deepEqual(disposed, [3, 2, 1, 0, 4]);
});

test('crossing below 1280px replaces the desktop sequence with independent cards', () => {
  const { cards, root } = fixture();
  let listener;
  const layout = {
    matches: true,
    addEventListener(_type, nextListener) { listener = nextListener; },
    removeEventListener(_type, oldListener) {
      if (listener === oldListener) listener = undefined;
    },
  };
  const calls = [];
  let disposed = 0;
  const cleanup = setupResponsiveGameCardMotion(root, layout, (trigger, targets, options) => {
    calls.push({ trigger, targets, options });
    return () => { disposed += 1; };
  });

  assert.equal(calls.length, 1);
  listener({ matches: false });

  assert.equal(disposed, 1);
  assert.equal(calls.length, 5);
  for (let index = 0; index < cards.length; index += 1) {
    assert.equal(calls[index + 1].trigger, cards[index]);
    assert.deepEqual(calls[index + 1].targets, [cards[index]]);
    assert.deepEqual(calls[index + 1].options, { distance: 12, duration: 0.4, stagger: 0 });
  }

  cleanup();
  assert.equal(listener, undefined);
  assert.equal(disposed, 5);
});
