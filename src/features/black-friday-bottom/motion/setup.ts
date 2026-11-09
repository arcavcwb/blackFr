export interface BottomRevealOptions {
  distance: number;
  duration: number;
}

export type BottomRevealRegistrar = (
  target: HTMLElement,
  options: BottomRevealOptions,
) => () => void;

const ACTION_OPTIONS: BottomRevealOptions = { distance: 16, duration: 0.35 };
const CONTACT_OPTIONS: BottomRevealOptions = { distance: 12, duration: 0.35 };

/**
 * Adds only the entries allowed by M09/M10. FAQ stays native: its answers are
 * never placed in an animated height container and its disclosure is immediate.
 */
export function setupBottomMotion(
  root: ParentNode,
  register: BottomRevealRegistrar,
): () => void {
  const actions = root.querySelector<HTMLElement>('[data-bottom-motion-actions]');
  const contacts = Array.from(root.querySelectorAll<HTMLElement>('[data-bottom-motion-contact]'));
  const disposers: Array<() => void> = [];

  try {
    if (actions) disposers.push(register(actions, ACTION_OPTIONS));
    for (const contact of contacts) {
      disposers.push(register(contact, CONTACT_OPTIONS));
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
