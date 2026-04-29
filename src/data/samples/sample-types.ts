// Sample type pool for alpha-zero. Each entry's source description is the
// implicit prior the player must reason from; the numerical priors are
// invisible in-game.

import { SampleType } from '../../core/reading/sample-model';

export const SAMPLE_TYPES: SampleType[] = [
  {
    id: 'grain-high-terrace',
    description: 'um punhado de grão do terraço alto',
    priorMirror: 0.10,
    priorInert: 0
  },
  {
    id: 'grain-low-terrace',
    description: 'um punhado de grão do terraço baixo (a vergonha do verão passado)',
    priorMirror: 0.45,
    priorInert: 0
  },
  {
    id: 'water-spring',
    description: 'um copo de água da fonte da manhã',
    priorMirror: 0.05,
    priorInert: 0
  },
  {
    id: 'water-river',
    description: 'um copo de água do rio',
    priorMirror: 0.55,
    priorInert: 0
  },
  {
    id: 'unknown-leaf',
    description: 'uma folha de uma árvore que não conheces',
    priorMirror: 0.30,
    priorInert: 0
  },
  {
    id: 'bronze-fragment',
    description: 'um fragmento de bronze achado no caminho',
    priorMirror: 0,
    priorInert: 1
  }
];
