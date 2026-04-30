// Family 4 — Os Dois Sinais — independence of joint events.
// Counterpart to the Elder Fire's parable "Duas flechas".
// Brazilian Portuguese (você-form).

import { Exercise } from '../../core/exercises/exercise-model';

export const osDoisSinais: Exercise[] = [
  {
    id: 'ods-1',
    family: 4,
    conceptName: 'Os Dois Sinais',
    difficulty: 1,
    statement:
      'Lanço duas moedas honestas, uma após a outra. Os resultados são independentes. Qual a probabilidade de ambas saírem cara?',
    options: ['1/2', '1/3', '1/4', '1/8'],
    correctIndex: 2
  },
  {
    id: 'ods-2',
    family: 4,
    conceptName: 'Os Dois Sinais',
    difficulty: 2,
    statement:
      'Solto uma flecha que atinge o alvo com probabilidade 1/3. Tu soltas outra, em direção oposta, que atinge o seu alvo com probabilidade 1/4. As duas flechas são independentes. Qual a probabilidade de ambas atingirem?',
    options: ['1/12', '7/12', '1/2', '2/7'],
    correctIndex: 0
  },
  {
    id: 'ods-3',
    family: 4,
    conceptName: 'Os Dois Sinais',
    difficulty: 3,
    statement:
      'Dois caçadores partem em direções opostas. Sem tempestade, cada um retorna com caça com probabilidade 1/2, e os retornos são independentes. Mas se vem uma tempestade — o que acontece com probabilidade 1/4 — nenhum retorna. Qual a probabilidade de ambos retornarem com caça?',
    options: ['1/4', '3/16', '1/8', '5/16'],
    correctIndex: 1
  },
  {
    id: 'ods-4',
    family: 4,
    conceptName: 'Os Dois Sinais',
    difficulty: 2,
    statement:
      'Em uma noite de aurora, a probabilidade de o vento mudar é 1/5. Em outra noite qualquer, é também 1/5. Suponha que os ventos de noites diferentes são independentes. Qual a probabilidade de o vento mudar em três noites seguidas?',
    options: ['3/5', '1/15', '1/125', '3/125'],
    correctIndex: 2
  }
];
