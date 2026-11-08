export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  id: string;
  heading: string;
  description?: string;
  links: readonly ContactLink[];
  icon: 'headset' | 'phone';
}
