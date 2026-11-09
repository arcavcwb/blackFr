import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  registerReveal,
  type MotionDriver,
  type RevealOptions,
} from '../../motion/core';
import {
  setupResponsiveGameCardMotion,
  type CardMotionOptions,
  type CardSequenceRegistrar,
} from './setup';

const registerSequence: CardSequenceRegistrar = (trigger, targets, sequence) => {
  const driver: MotionDriver = {
    watch(target, enter) {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger.create({
        trigger: target,
        start: 'top 85%',
        once: true,
        onEnter: enter,
      });
    },
    animate(target, options: RevealOptions, complete) {
      const context = gsap.context(() => {}, target);
      try {
        context.add(() => gsap.from(targets, {
          y: options.distance ?? sequence.distance,
          duration: options.duration ?? sequence.duration,
          stagger: sequence.stagger,
          ease: 'power2.out',
          onComplete: complete,
        }));
      } catch (error) {
        context.revert();
        throw error;
      }
      return { revert: () => context.revert() };
    },
  };

  return registerReveal(trigger, driver, sequence);
};

/** Mounts M08 for one Game da Black section. */
export function mountGameCardMotion(root: HTMLElement): () => void {
  const requestedFeatureAccess = (candidate: Element | null) =>
    !!candidate && (candidate === root || root.contains(candidate) || candidate.contains(root));
  const currentAnchor = () => {
    if (!location.hash || location.hash === '#') return null;
    try {
      return document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      return null;
    }
  };

  // An anchor can name an ancestor section rather than the animated list.
  // In that case content access takes priority and no decorative entry starts.
  if (requestedFeatureAccess(currentAnchor())) return () => {};

  const layout = window.matchMedia('(min-width: 1280px)');
  const cleanupMotion = setupResponsiveGameCardMotion(root, layout, registerSequence);
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    window.removeEventListener('hashchange', onHashChange);
    document.removeEventListener('focusin', onFocus);
    cleanupMotion();
  };
  const onHashChange = () => {
    if (requestedFeatureAccess(currentAnchor())) dispose();
  };
  const onFocus = (event: FocusEvent) => {
    if (event.target instanceof Element && requestedFeatureAccess(event.target)) dispose();
  };
  window.addEventListener('hashchange', onHashChange);
  document.addEventListener('focusin', onFocus);
  return dispose;
}

export type { CardMotionOptions };
