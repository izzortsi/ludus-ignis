// What the apprentice brings to the Cinder.
// Each sample type carries an implicit prior (P(mirror), P(inert)) determined by
// its source — high terrace lower than low terrace, spring water lower than river,
// etc. The player never sees these numerically; they read the source description.

export type Chirality = 'native' | 'mirror' | 'inert';

export interface SampleType {
  id: string;
  description: string;       // shown to player; the implicit prior cue
  priorMirror: number;       // P(true chirality = mirror) for this source
  priorInert: number;        // P(true chirality = inert) for this source
  // P(native) = 1 - priorMirror - priorInert
}

export interface Sample {
  type: SampleType;
  trueChirality: Chirality;  // hidden from player until consequence
}

export function instantiateSample(type: SampleType): Sample {
  const r = Math.random();
  let trueChirality: Chirality;
  if (r < type.priorMirror) trueChirality = 'mirror';
  else if (r < type.priorMirror + type.priorInert) trueChirality = 'inert';
  else trueChirality = 'native';
  return { type, trueChirality };
}
