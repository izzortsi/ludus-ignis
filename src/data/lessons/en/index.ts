// English lesson set.
//
// Phase 3 stub: re-exports the PT array unchanged so EN mode is playable
// (with PT content) the moment the locale switcher works. Phases 4 will
// replace this with translated lesson files mirroring the pt/ tree:
//
//   en/a-forma-do-mundo-possivel.ts  (translated)
//   en/a-roda-das-inclusoes.ts       (translated)
//   en/as-juras-da-chama.ts          (translated)
//   en/duas-flechas.ts               (translated, file name kept stable)
//
// Once each EN file lands, swap its import here in declaration order.

import { lessonsPt } from '../pt';

export const lessonsEn = lessonsPt;
