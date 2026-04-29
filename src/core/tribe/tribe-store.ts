import { createStore } from 'solid-js/store';
import { TribeState, newTribe, inflictThéaSickness as inflictPure } from './tribe-model';

const [tribe, setTribe] = createStore<TribeState>(newTribe());

export function inflictThéaSickness(): void {
  setTribe(inflictPure(tribe));
}

export function restoreTribe(state: TribeState): void {
  setTribe(state);
}

export { tribe };
