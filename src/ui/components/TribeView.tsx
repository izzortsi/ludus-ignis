import { createMemo } from 'solid-js';
import { tribe } from '../../core/tribe/tribe-store';
import { isThéaSick, théaDaysRemaining } from '../../core/tribe/tribe-model';
import { now } from '../../core/world/clock';

export function TribeView() {
  const sick = createMemo(() => isThéaSick(tribe, now()));
  const days = createMemo(() => théaDaysRemaining(tribe, now()));

  return (
    <div class="tribe-view">
      <h3 class="tribe-heading">o bando</h3>
      <p class={`tribe-line ${sick() ? 'is-sick' : 'is-well'}`}>
        Théa: {sick() ? `doente — ${days()} ${days() === 1 ? 'dia' : 'dias'} até melhorar` : 'bem'}
      </p>
    </div>
  );
}
