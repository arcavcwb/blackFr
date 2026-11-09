import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerReveal, type MotionDriver, type RevealOptions } from './core';

export type { RevealOptions } from './core';

const driver: MotionDriver = {
  watch(target, enter) {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger.create({ trigger: target, start: 'top 85%', once: true, onEnter: enter });
  },
  animate(target, options, complete) {
    // Context restores only the inline properties GSAP changed, including any
    // pre-existing transform; it never clears the target's intrinsic styles.
    const context = gsap.context(() => {}, target);
    try {
      context.add(() => gsap.from(target, {
        y: options.distance ?? 16,
        duration: options.duration ?? 0.35,
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

/** Opt in per wrapper. Call the returned function when the feature unmounts. */
export function revealOnScroll(target: HTMLElement, options?: RevealOptions): () => void {
  return registerReveal(target, driver, options);
}
