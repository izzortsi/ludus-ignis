import { createMemo, createSignal, onMount, onCleanup } from 'solid-js';
import { cinder } from '../../core/cinder/cinder-store';
import { currentVitality, bandOf, VitalityBand } from '../../core/cinder/cinder-model';
import { now } from '../../core/world/clock';
import { computeFlameLayers } from '../ascii/flame';

const FLICKER_FPS = 6;

const BAND_LABEL: Record<VitalityBand, string> = {
  bright: 'viva',
  warm:   'quente',
  low:    'fraca',
  ember:  'brasa'
};

export function CinderView() {
  const [tick, setTick] = createSignal(0);

  onMount(() => {
    const id = window.setInterval(() => setTick(t => t + 1), 1000 / FLICKER_FPS);
    onCleanup(() => clearInterval(id));
  });

  const vitality = createMemo(() => currentVitality(cinder, now()));
  const band     = createMemo(() => bandOf(vitality()));
  const layers   = createMemo(() => computeFlameLayers({ vitality: vitality(), tick: tick() }));

  return (
    <div class="cinder-view">
      <div class="cinder-name">{cinder.name}</div>
      <div class="cinder-stack">
        <pre class="flame-layer flame-vessel">{layers().vessel}</pre>
        <pre class="flame-layer flame-red">{layers().red}</pre>
        <pre class="flame-layer flame-orange">{layers().orange}</pre>
        <pre class="flame-layer flame-amber">{layers().amber}</pre>
        <pre class="flame-layer flame-sparks">{layers().sparks}</pre>
      </div>
      <div class="cinder-vitality">
        vitalidade: {Math.round(vitality())}/100 — {BAND_LABEL[band()]}
      </div>
    </div>
  );
}
