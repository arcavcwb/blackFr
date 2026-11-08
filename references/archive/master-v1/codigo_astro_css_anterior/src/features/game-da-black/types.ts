import type { ImageMetadata } from 'astro';

/** A single, ordered participation instruction; copy stays outside the UI component. */
export interface ParticipationStep {
  readonly number: 1 | 2 | 3 | 4;
  readonly title: string;
  readonly description: string;
  readonly illustration: ImageMetadata;
  readonly result?: string;
  readonly bonus?: string;
}
