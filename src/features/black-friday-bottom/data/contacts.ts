import type { ContactInfo } from '../types';

// Text and destinations reproduced from the existing live page (08 Nov 2026).
// Do not change campaign/legal information without approval.
export const contactItems = [
  {
    id: 'sac',
    heading: 'Elogios, dúvidas ou sugestões',
    links: [
      { label: 'SAC: 0800 416655', href: 'tel:0800416655' },
      { label: 'institucional.condor.com.br/sac', href: 'https://institucional.condor.com.br/sac' },
    ],
    icon: 'headset',
  },
  {
    id: 'ganhadores',
    heading: 'É um dos ganhadores?',
    description: 'Você poderá ser contatado por um dos canais abaixo:',
    links: [{ label: 'Tel: (41) 3888-3773', href: 'tel:+554138883773' }],
    icon: 'phone',
  },
] as const satisfies readonly ContactInfo[];
