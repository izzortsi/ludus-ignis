// Portuguese lesson set. The order here is the canonical lesson order
// (P0 first: families 1-3, then P1 family 7). Lesson IDs are stable
// across locales — every locale's array exports lessons with the same
// ids in the same order.

import { Lesson } from '../../../core/lessons/lesson-model';
import { aFormaDoMundoPossivel } from './a-forma-do-mundo-possivel';
import { aRodaDasInclusoes }     from './a-roda-das-inclusoes';
import { asJurasDaChama }        from './as-juras-da-chama';
import { duasFlechas }           from './duas-flechas';

export const lessonsPt: Lesson[] = [
  aFormaDoMundoPossivel,
  aRodaDasInclusoes,
  asJurasDaChama,
  duasFlechas
];
