// Portuguese exercise pool. Concatenates every family's exercises into
// one array; the exercise-store filters by `family` at lookup time.
// Exercise IDs are stable across locales.

import { Exercise } from '../../../core/exercises/exercise-model';
import { aFormaDoMundoPossivel } from './a-forma-do-mundo-possivel';
import { aRodaDasInclusoes }     from './a-roda-das-inclusoes';
import { asJurasDaChama }        from './as-juras-da-chama';
import { osDoisSinais }          from './os-dois-sinais';
import { aMaoCegaNoJarro }       from './a-mao-cega-no-jarro';
import { oCaminhoDeVolta }       from './o-caminho-de-volta';
import { oCaminhoDeVoltaLista2 } from './o-caminho-de-volta-lista2';

export const exercisesPt: Exercise[] = [
  // P0 (foundations)
  ...aFormaDoMundoPossivel,
  ...aRodaDasInclusoes,
  ...asJurasDaChama,
  // P1 (combinatorics & elementary probability)
  ...osDoisSinais,
  ...aMaoCegaNoJarro,
  ...oCaminhoDeVolta,
  ...oCaminhoDeVoltaLista2
];
