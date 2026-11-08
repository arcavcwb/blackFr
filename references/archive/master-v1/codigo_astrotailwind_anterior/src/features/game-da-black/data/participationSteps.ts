import type { ParticipationStep } from '../types';
import appIllustration from '../../../assets/game-da-black/illustration-step-1.png';
import offersIllustration from '../../../assets/game-da-black/illustration-step-2.png';
import productsIllustration from '../../../assets/game-da-black/illustration-step-3.png';
import numbersIllustration from '../../../assets/game-da-black/illustration-step-4.png';

/** Update campaign copy here. The step/card layout never needs editing. */
export const participationSteps = [
  {
    number: 1,
    title: 'Comece pelo app',
    description: 'Acesse o app Clube Condor e confira se seu cadastro está completo e atualizado.',
    illustration: appIllustration,
  },
  {
    number: 2,
    title: 'Ative antes de comprar',
    description: 'Escolha e ative as ofertas da semana antes de realizar suas compras.',
    illustration: offersIllustration,
  },
  {
    number: 3,
    title: '3 produtos = 1 número',
    description: 'Compre 3 produtos diferentes das ofertas ativadas em uma loja Condor e informe seu CPF no caixa.',
    result: 'Ganhe 1 número da sorte.',
    bonus: 'Com 5 produtos, você pode ganhar mais 1 número, quando houver bônus.',
    illustration: productsIllustration,
  },
  {
    number: 4,
    title: 'Confira seus números no app',
    description: 'Confira seus números da sorte no app e participe dos sorteios da promoção!',
    illustration: numbersIllustration,
  },
] as const satisfies readonly ParticipationStep[];
