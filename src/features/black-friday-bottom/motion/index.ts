import { revealOnScroll } from '../../motion';
import { setupBottomMotion } from './setup';

/** Mounts the independent M09/M10 entries for one lower-content block. */
export function mountBottomMotion(root: HTMLElement): () => void {
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

  if (requestedFeatureAccess(currentAnchor())) return () => {};

  const cleanupMotion = setupBottomMotion(
    root,
    (target, options) => revealOnScroll(target, options),
  );
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

export type { BottomRevealOptions } from './setup';
