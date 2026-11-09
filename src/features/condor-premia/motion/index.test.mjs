import assert from 'node:assert/strict';
import test from 'node:test';
import { mountPremiaMotion, prizeTargets } from './index.ts';

test('desktop keeps the supplied prize composite; mobile uses the three supplied pieces', () => {
  const composite = [{}];
  const pieces = [{}, {}, {}];
  const figure = {
    querySelectorAll(selector) {
      if (selector === '.premia__prize-composition') return composite;
      if (selector === '.premia__prize-pieces img') return pieces;
      throw new Error(`Unexpected selector: ${selector}`);
    },
  };
  assert.deepEqual(prizeTargets(figure, false), composite);
  assert.deepEqual(prizeTargets(figure, true), pieces);
});

test('prizes and four participation steps register independently and clean up', () => {
  const prizes = {};
  const participation = {};
  const targets = new Map([
    ['.premia__prizes', prizes],
    ['.premia__participation', participation],
  ]);
  const registered = [];
  const cleaned = [];
  const root = { querySelector: (selector) => targets.get(selector) };
  const dispose = mountPremiaMotion(root, (target, driver) => {
    registered.push([target, driver]);
    return () => cleaned.push(target);
  });
  assert.deepEqual(registered.map(([target]) => target), [prizes, participation]);
  assert.equal(registered.every(([, driver]) => typeof driver.watch === 'function' && typeof driver.animate === 'function'), true);
  dispose();
  assert.deepEqual(cleaned, [prizes, participation]);
});

test('a failed prize registration is reported while steps still register', () => {
  const prizes = {};
  const participation = {};
  const root = { querySelector: (selector) => ({
    '.premia__prizes': prizes,
    '.premia__participation': participation,
  })[selector] };
  const previousError = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  let cleaned = false;
  try {
    const dispose = mountPremiaMotion(root, (target) => {
      if (target === prizes) throw new Error('injected registration failure');
      return () => { cleaned = true; };
    });
    assert.equal(errors.length, 1);
    assert.match(errors[0][0], /Condor Premia motion registration failed for \.premia__prizes/);
    assert.match(errors[0][1].message, /injected registration failure/);
    dispose();
    assert.equal(cleaned, true);
  } finally { console.error = previousError; }
});
