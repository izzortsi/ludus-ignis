import { Lesson } from '../../core/lessons/lesson-model';
import { aFormaDoMundoPossivel } from './a-forma-do-mundo-possivel';
import { aRodaDasInclusoes } from './a-roda-das-inclusoes';
import { asJurasDaChama } from './as-juras-da-chama';
import { duasFlechas } from './duas-flechas';

// Order matters: ALL_LESSONS[0] is the lesson a fresh player begins with,
// and lesson advancement (lesson-store) walks the array in order. P0
// foundations come first, then P1.
export const ALL_LESSONS: Lesson[] = [
  aFormaDoMundoPossivel,  // family 1 (P0)
  aRodaDasInclusoes,      // family 2 (P0)
  asJurasDaChama,         // family 3 (P0)
  duasFlechas             // family 7 (P1, Os Dois Sinais)
];
