import { createStore } from 'solid-js/store';
import { CinderState, newCinder } from './cinder-model';

const [cinder, setCinder] = createStore<CinderState>(newCinder());

export { cinder, setCinder };
