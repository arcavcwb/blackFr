export interface CardMotionOptions {
  distance: number;
  duration: number;
  stagger: number;
}

export type CardSequenceRegistrar = (
  trigger: HTMLElement,
  targets: readonly HTMLElement[],
  options: CardMotionOptions,
) => () => void;

export type CardLayoutQuery = Pick<
  MediaQueryList,
  'matches' | 'addEventListener' | 'removeEventListener'
>;

const DESKTOP_SEQUENCE: CardMotionOptions = {
  distance: 16,
  duration: 0.45,
  stagger: 0.1,
};

const COMPACT_SEQUENCE: CardMotionOptions = {
  distance: 12,
  duration: 0.4,
  stagger: 0,
};

/**
 * Connects the approved cards to motion without changing their DOM, grid or
 * final styles. Desktop uses the documented 1-to-4 sequence; compact layouts
 * keep an independent trigger per card.
 */
export function setupGameCardMotion(
  root: ParentNode,
  desktop: boolean,
  register: CardSequenceRegistrar,
): () => void {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-gdb-motion-card]'));
  if (cards.length === 0) return () => {};

  const disposers: Array<() => void> = [];
  try {
    if (desktop) {
      const group = root.querySelector<HTMLElement>('[data-gdb-motion-group]');
      if (group) disposers.push(register(group, cards, DESKTOP_SEQUENCE));
    } else {
      for (const card of cards) {
        disposers.push(register(card, [card], COMPACT_SEQUENCE));
      }
    }
  } catch (error) {
    for (const dispose of disposers.reverse()) dispose();
    throw error;
  }

  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    for (const dispose of disposers.reverse()) dispose();
  };
}

/**
 * Keeps the card registrations aligned with the live 1/2/4-column layout.
 * Crossing the desktop breakpoint first restores the current registrations,
 * then installs the interaction model for the new layout.
 */
export function setupResponsiveGameCardMotion(
  root: ParentNode,
  layout: CardLayoutQuery,
  register: CardSequenceRegistrar,
): () => void {
  let desktop = layout.matches;
  let cleanupMotion = setupGameCardMotion(root, desktop, register);
  let disposed = false;

  const onLayoutChange = (event: MediaQueryListEvent) => {
    if (disposed || event.matches === desktop) return;

    cleanupMotion();
    desktop = event.matches;
    cleanupMotion = setupGameCardMotion(root, desktop, register);
  };

  layout.addEventListener('change', onLayoutChange);

  return () => {
    if (disposed) return;
    disposed = true;
    layout.removeEventListener('change', onLayoutChange);
    cleanupMotion();
  };
}
