/** Small, injectable lifecycle for decorative, visible-at-all-times motion. */
export interface MotionHandle { revert(): void }
export interface TriggerHandle { kill(): void }
export interface MotionDriver {
  watch(target: HTMLElement, enter: () => void): TriggerHandle;
  animate(target: HTMLElement, options: RevealOptions, complete: () => void): MotionHandle;
}
export interface RevealOptions {
  /** Decorative vertical offset in CSS pixels; applied only after entering. */
  distance?: number;
  /** Seconds. Values are candidates, not approved motion parameters. */
  duration?: number;
}

/** Registers one independent reveal. Returns an idempotent teardown. */
export function registerReveal(target: HTMLElement, driver: MotionDriver, options: RevealOptions = {}): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let trigger: TriggerHandle | undefined;
  let animation: MotionHandle | undefined;
  let finished = false;
  let disposed = false;

  const finish = () => {
    finished = true;
    const oldTrigger = trigger;
    const oldAnimation = animation;
    trigger = undefined;
    animation = undefined;
    try { oldTrigger?.kill(); } finally { oldAnimation?.revert(); }
  };
  const containsHash = (hash: string) => {
    if (!hash || hash === '#') return false;
    try {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      return !!element && (element === target || target.contains(element));
    } catch { return false; }
  };
  const onFocus = () => finish();
  const onHash = () => { if (containsHash(location.hash)) finish(); };
  const enter = () => {
    if (finished || disposed || media.matches) return;
    trigger?.kill();
    trigger = undefined;
    // Only transform a visible wrapper: no opacity, visibility or pointer-event changes.
    try {
      const handle = driver.animate(target, options, () => finish());
      if (finished || disposed) handle.revert();
      else animation = handle;
    } catch (error) { finish(); throw error; }
  };
  const start = () => {
    if (finished || disposed || media.matches || trigger || animation) return;
    if (!target.isConnected || target.getBoundingClientRect().top <= window.innerHeight * 0.85 || target.contains(document.activeElement) || containsHash(location.hash)) {
      finish();
      return;
    }
    try {
      const handle = driver.watch(target, enter);
      if (finished || disposed || animation) handle.kill();
      else trigger = handle;
    } catch (error) { finish(); throw error; }
  };
  const onPreference = () => { if (media.matches) finish(); else start(); };
  target.addEventListener('focusin', onFocus);
  window.addEventListener('hashchange', onHash);
  media.addEventListener('change', onPreference);
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    try { finish(); } finally {
      target.removeEventListener('focusin', onFocus);
      window.removeEventListener('hashchange', onHash);
      media.removeEventListener('change', onPreference);
    }
  };
  try { start(); } catch (error) { dispose(); throw error; }
  return dispose;
}
