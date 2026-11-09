import { gsap } from 'gsap';

/** The three supplied PNGs are the only hero layers eligible for motion. */
export function mountHeroMotion(root: HTMLElement): () => void {
  const title = root.querySelector<HTMLImageElement>('[data-motion-hero-title]');
  const presenter = root.querySelector<HTMLImageElement>('[data-motion-hero-presenter]');
  const background = root.querySelector<HTMLImageElement>('[data-motion-hero-background]');
  if (!title || !presenter || !background || !window.matchMedia) return () => {};
  const images: HTMLImageElement[] = [background, title, presenter];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 767px)');
  let context: gsap.Context | undefined;
  let cancelled = false;
  let started = false;

  const finish = () => {
    if (cancelled) return;
    cancelled = true;
    const activeContext = context;
    context = undefined;
    background.removeEventListener('load', start);
    background.removeEventListener('error', finish);
    title.removeEventListener('load', start);
    title.removeEventListener('error', finish);
    presenter.removeEventListener('load', start);
    presenter.removeEventListener('error', finish);
    root.removeEventListener('focusin', finish);
    reduced.removeEventListener('change', onPreference);
    window.removeEventListener('hashchange', onHash);
    activeContext?.revert();
  };
  const onPreference = () => { if (reduced.matches) finish(); };
  const onHash = () => { if (location.hash === `#${root.id}`) finish(); };

  function start() {
    if (started || cancelled || reduced.matches) return;
    // All critical PNGs must be ready; the promotional video is independent.
    if (!images.every((image) => image.complete && image.naturalWidth > 0)) return;
    if (root.getBoundingClientRect().bottom <= 0) { finish(); return; }
    if (root.contains(document.activeElement) || location.hash === `#${root.id}`) { finish(); return; }
    started = true;
    try {
      context = gsap.context(() => {}, root);
      context.add(() => {
        const timeline = gsap.timeline({ onComplete: finish });
        if (mobile.matches) {
          // A short mobile sequence stays within the artwork's clipped bounds.
          timeline.from(title, { y: 12, duration: 0.45, ease: 'power3.out' }, 0)
            .from(presenter, { y: 14, scale: 0.99, transformOrigin: 'bottom right', duration: 0.5, ease: 'power3.out' }, 0.1);
        } else {
          timeline.from(title, { y: 20, duration: 0.55, ease: 'power3.out' }, 0.1)
            .from(presenter, { y: 24, scale: 0.98, transformOrigin: 'bottom right', duration: 0.65, ease: 'power3.out' }, 0.3);
        }
      });
    } catch (error) {
      try { finish(); }
      catch (cleanupError) { console.error('Black Friday hero motion cleanup failed', cleanupError); }
      console.error('Black Friday hero motion setup failed', error);
    }
  }

  root.addEventListener('focusin', finish);
  reduced.addEventListener('change', onPreference);
  window.addEventListener('hashchange', onHash);
  for (const image of images) {
    image.addEventListener('load', start);
    image.addEventListener('error', finish);
  }
  if (reduced.matches) finish();
  else start();
  return finish;
}
