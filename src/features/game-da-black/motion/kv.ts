import { revealOnScroll } from '../../motion/index.ts';

/** M07 fallback: move only the wrapper of the intact supplied KV. */
export function mountKeyVisualMotion(root: HTMLElement, reveal = revealOnScroll): () => void {
  const wrapper = root.querySelector<HTMLElement>('[data-motion-gdb-kv]');
  if (!wrapper) return () => {};
  if (location.hash === '#game-da-black') return () => {};
  const previousStyle = wrapper.getAttribute('style');
  let dispose: (() => void) | undefined;
  let listening = false;
  const cleanup = () => {
    if (listening) window.removeEventListener('hashchange', onHash);
    listening = false;
    const release = dispose;
    dispose = undefined;
    release?.();
  };
  const onHash = () => { if (location.hash === '#game-da-black') cleanup(); };
  try {
    dispose = reveal(wrapper, { distance: 16, duration: 0.5 });
    window.addEventListener('hashchange', onHash);
    listening = true;
    return cleanup;
  }
  catch (error) {
    try { cleanup(); }
    catch (cleanupError) { console.error('Game da Black key visual motion cleanup failed', cleanupError); }
    if (previousStyle === null) wrapper.removeAttribute('style');
    else wrapper.setAttribute('style', previousStyle);
    console.error('Game da Black key visual motion registration failed', error);
    return () => {};
  }
}
