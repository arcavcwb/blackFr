import landingContentJson from '../../content/landing-content.json';

/**
 * Canonical landing content.
 *
 * `content/landing-content.json` remains the only editorial source. Keep its
 * original Portuguese keys and values intact; consumers should import the
 * named exports below instead of maintaining campaign-copy duplicates.
 */
export const landingContent = landingContentJson;

export type LandingContent = typeof landingContent;
export type MenuItem = LandingContent['menu'][number];
export type CondorPremiaStep = LandingContent['comoParticipar']['passos'][number];
export type GameParticipationItem = LandingContent['game']['passos']['itens'][number];
export type CampaignAction = LandingContent['regulamento']['botoes'][number];
export type FaqContentItem = LandingContent['faq']['itens'][number];
export type ContactChannel = LandingContent['canais']['cartoes'][number];
export type FooterLink = LandingContent['rodape']['links'][number];
export type SocialLink = LandingContent['rodape']['redes'][number];

export const seoContent = landingContent.seo;
export const menuItems = landingContent.menu;
export const heroContent = landingContent.hero;
export const videoContent = landingContent.video;
export const aboutContent = landingContent.sobre;
export const condorPremiaContent = landingContent.comoParticipar;
export const gameContent = landingContent.game;
export const regulationContent = landingContent.regulamento;
export const faqContent = landingContent.faq;
export const channelsContent = landingContent.canais;
export const footerContent = landingContent.rodape;
