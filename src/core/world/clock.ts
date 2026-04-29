// Wall-clock signal — broadcasts the current time to anyone who depends on it.
// Drives the Cinder's vitality re-render at second resolution.

import { createSignal } from 'solid-js';

const [now, setNow] = createSignal(Date.now());

let intervalId: number | null = null;

export function startClock(intervalMs: number = 1000): void {
  if (intervalId !== null) return;
  intervalId = window.setInterval(() => setNow(Date.now()), intervalMs);
}

export function stopClock(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export { now };
