import type { ParticipationStep } from '../types';
import { gameContent } from '../../../data/landing-content';
import appIllustration from '../../../assets/game-da-black/illustration-step-1.png';
import offersIllustration from '../../../assets/game-da-black/illustration-step-2.png';
import productsIllustration from '../../../assets/game-da-black/illustration-step-3.png';
import numbersIllustration from '../../../assets/game-da-black/illustration-step-4.png';

const illustrations = [
  appIllustration,
  offersIllustration,
  productsIllustration,
  numbersIllustration,
] as const;

const stepNumbers = [1, 2, 3, 4] as const;

/**
 * Presentation metadata is paired with the canonical four Game da Black
 * instructions. All campaign text is read directly from landing-content.json.
 */
export const participationSteps = gameContent.passos.itens.map((item, index) => ({
  number: stepNumbers[index]!,
  title: item.titulo,
  description: item.descricao,
  illustration: illustrations[index]!,
})) satisfies readonly ParticipationStep[];
