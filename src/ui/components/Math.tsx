import { onMount, createEffect } from 'solid-js';
import katex from 'katex';

interface Props {
  /** LaTeX source. */
  tex: string;
  /** When true (default), renders as a centered display equation; otherwise inline. */
  display?: boolean;
}

// Renders LaTeX via KaTeX. Re-renders when `tex` changes.
export function Math(props: Props) {
  let ref: HTMLSpanElement | undefined;

  function render() {
    if (!ref) return;
    katex.render(props.tex, ref, {
      throwOnError: false,
      displayMode: props.display !== false
    });
  }

  onMount(render);
  createEffect(render);

  return <span ref={ref} class={`math ${props.display !== false ? 'math-display' : 'math-inline'}`} />;
}
