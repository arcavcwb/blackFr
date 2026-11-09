import test from 'node:test';
import assert from 'node:assert/strict';
import { setupBottomMotion } from './setup.ts';

function fixture() {
  const actions = { id: 'actions' };
  const contacts = [{ id: 'contact-1' }, { id: 'contact-2' }];
  const root = {
    querySelector(selector) {
      assert.equal(selector, '[data-bottom-motion-actions]');
      return actions;
    },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-bottom-motion-contact]');
      return contacts;
    },
  };
  return { actions, contacts, root };
}

test('registers CTA and contacts without adding a FAQ height animation', () => {
  const { actions, contacts, root } = fixture();
  const calls = [];
  let disposed = 0;
  const cleanup = setupBottomMotion(root, (target, options) => {
    calls.push({ target, options });
    return () => { disposed += 1; };
  });

  assert.deepEqual(calls, [
    { target: actions, options: { distance: 16, duration: 0.35 } },
    { target: contacts[0], options: { distance: 12, duration: 0.35 } },
    { target: contacts[1], options: { distance: 12, duration: 0.35 } },
  ]);
  cleanup();
  cleanup();
  assert.equal(disposed, 3);
});

test('partial setup failure restores all previously registered targets', () => {
  const { root } = fixture();
  let registrations = 0;
  let disposed = 0;
  assert.throws(() => setupBottomMotion(root, () => {
    registrations += 1;
    if (registrations === 2) throw new Error('injected failure');
    return () => { disposed += 1; };
  }), /injected failure/);
  assert.equal(disposed, 1);
});
