import { createStore } from 'solid-js/store';
import { Sample, Chirality, instantiateSample } from './sample-model';
import { ReadingBand, readSample } from './reading-model';
import { SAMPLE_TYPES } from '../../data/samples/sample-types';
import { currentVitality } from '../cinder/cinder-model';
import { cinder } from '../cinder/cinder-store';
import { solarSigmaMultiplier } from '../world/solar-weather';

export type ReadingPhase = 'idle' | 'sample-drawn' | 'examining' | 'reading-shown' | 'decided';
export type Action = 'use' | 'burn';

interface ReadingState {
  phase: ReadingPhase;
  sample: Sample | null;
  band: ReadingBand | null;
  action: Action | null;
}

const [reading, setReading] = createStore<ReadingState>({
  phase: 'idle',
  sample: null,
  band: null,
  action: null
});

const EXAMINE_DELAY_MS = 700;

function pickSampleType() {
  return SAMPLE_TYPES[Math.floor(Math.random() * SAMPLE_TYPES.length)];
}

export function drawSample(): void {
  const sample = instantiateSample(pickSampleType());
  setReading({
    phase: 'sample-drawn',
    sample,
    band: null,
    action: null
  });
}

export function presentToFire(): void {
  if (!reading.sample) return;
  setReading({ phase: 'examining' });
  window.setTimeout(() => {
    if (!reading.sample) return;
    const band = readSample(
      reading.sample.trueChirality,
      currentVitality(cinder),
      solarSigmaMultiplier(Date.now())
    );
    setReading({
      phase: 'reading-shown',
      band
    });
  }, EXAMINE_DELAY_MS);
}

// Returns the true chirality so callers can apply tribe / world side effects.
export function decide(action: Action): Chirality | null {
  if (reading.phase !== 'reading-shown' || !reading.sample) return null;
  const chirality = reading.sample.trueChirality;
  setReading({ phase: 'decided', action });
  return chirality;
}

export function reset(): void {
  setReading({
    phase: 'idle',
    sample: null,
    band: null,
    action: null
  });
}

export { reading };
