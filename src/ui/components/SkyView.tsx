import { createMemo } from 'solid-js';
import { now } from '../../core/world/clock';
import { solarState, SOLAR_STATE_LABEL, atmosphericBlurb } from '../../core/world/solar-weather';

export function SkyView() {
  const state = createMemo(() => solarState(now()));

  return (
    <div class="sky-view">
      <h3 class="sky-heading">o céu</h3>
      <p class={`sky-state sky-state-${state()}`}>{SOLAR_STATE_LABEL[state()]}.</p>
      <p class="sky-blurb">{atmosphericBlurb(state())}</p>
    </div>
  );
}
