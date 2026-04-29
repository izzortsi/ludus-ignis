// Combined exercise pool. Add new family arrays here.

import { Exercise } from '../../core/exercises/exercise-model';
import { oCaminhoDeVolta } from './o-caminho-de-volta';
import { oCaminhoDeVoltaLista2 } from './o-caminho-de-volta-lista2';
import { aMaoCegaNoJarro } from './a-mao-cega-no-jarro';

export const ALL_EXERCISES: Exercise[] = [
  ...oCaminhoDeVolta,
  ...oCaminhoDeVoltaLista2,
  ...aMaoCegaNoJarro
];
