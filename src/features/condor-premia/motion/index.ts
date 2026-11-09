import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerReveal, type MotionDriver, type MotionHandle, type RevealOptions } from '../../motion/core.ts';

type Sequence = (target: HTMLElement, complete: () => void) => MotionHandle;

function sequenceDriver(sequence: Sequence): MotionDriver {
  return {
    watch(target, enter) {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger.create({ trigger: target, start: 'top 85%', once: true, onEnter: enter });
    },
    animate(target, _options: RevealOptions, complete) { return sequence(target, complete); },
  };
}

export function prizeTargets(target: HTMLElement, mobile: boolean): HTMLElement[] {
  return mobile
    ? [...target.querySelectorAll<HTMLElement>('.premia__prize-pieces img')]
    : [...target.querySelectorAll<HTMLElement>('.premia__prize-composition')];
}

function prizes(target: HTMLElement, complete: () => void): MotionHandle {
  const mobile = window.matchMedia('(max-width: 699px)').matches;
  const images = prizeTargets(target, mobile);
  if (images.length !== (mobile ? 3 : 1)) { complete(); return { revert() {} }; }
  const context = gsap.context(() => {}, target);
  try {
    context.add(() => gsap.from(images, {
      scale: 0.98,
      transformOrigin: 'center center',
      duration: 0.5,
      stagger: mobile ? 0.08 : 0,
      ease: 'power2.out',
      onComplete: complete,
    }));
  } catch (error) { context.revert(); throw error; }
  return { revert: () => context.revert() };
}

function steps(target: HTMLElement, complete: () => void): MotionHandle {
  const items = [...target.querySelectorAll<HTMLElement>('.premia__step')];
  if (items.length !== 4) { complete(); return { revert() {} }; }
  const context = gsap.context(() => {}, target);
  try {
    context.add(() => gsap.from(items, {
      y: 16,
      duration: 0.4,
      stagger: window.matchMedia('(max-width: 767px)').matches ? 0.06 : 0.1,
      ease: 'power2.out',
      onComplete: complete,
    }));
  } catch (error) { context.revert(); throw error; }
  return { revert: () => context.revert() };
}

/** Desktop prizes remain the approved composite; mobile uses its supplied pieces. */
export function mountPremiaMotion(root: HTMLElement, register = registerReveal): () => void {
  const disposers: Array<() => void> = [];
  const groups: Array<[string, Sequence]> = [
    ['.premia__prizes', prizes],
    ['.premia__participation', steps],
  ];
  for (const [selector, sequence] of groups) {
    const target = root.querySelector<HTMLElement>(selector);
    if (!target) continue;
    try { disposers.push(register(target, sequenceDriver(sequence))); }
    catch (error) {
      // Each group is independent; report the failed registration and leave its
      // original artwork visible while the other group remains available.
      console.error(`Condor Premia motion registration failed for ${selector}`, error);
    }
  }
  return () => { for (const dispose of disposers) dispose(); };
}
