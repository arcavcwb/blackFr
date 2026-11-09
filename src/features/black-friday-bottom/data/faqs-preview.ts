import type { FaqItem } from '../types';
import { faqContent } from '../../../data/landing-content';

/**
 * ONLY for preview: this placeholder text is what is currently on localhost.
 * Replace using the actual FAQ source module of the site before publication.
 * No FAQ content is invented here.
 */
export const faqPreviewItems: readonly FaqItem[] = faqContent.itens.map((item, index) => ({
  id: `faq-${index + 1}`,
  question: item.pergunta,
  answer: item.resposta,
}));
