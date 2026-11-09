import { channelsContent } from '../../../data/landing-content';
import type { ContactInfo } from '../types';

/** Contact copy and destinations come from the canonical landing content. */
export const contactItems = channelsContent.cartoes.map((card, index) => ({
  id: `contact-${index + 1}`,
  heading: card.titulo,
  ...(card.subtitulo ? { description: card.subtitulo } : {}),
  links: card.contatos.map(({ rotulo, href }) => ({ label: rotulo, href })),
  icon: index === 0 ? 'headset' : 'phone',
})) satisfies readonly ContactInfo[];
