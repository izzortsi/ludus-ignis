import { JSX } from 'solid-js';

interface Props {
  title: string;
  onClose: () => void;
  children: JSX.Element;
}

export function MapDialog(props: Props) {
  // Backdrop close: only fire on a click whose target is literally the
  // backdrop (not a child). The previous bare onClick={props.onClose} would
  // also fire when an event bubbled up from the map after a tap-walk
  // reached the interactable and rendered the dialog — closing it on the
  // same gesture that opened it.
  function onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) props.onClose();
  }
  return (
    <div class="map-dialog-backdrop" onClick={onBackdropClick}>
      <div class="map-dialog" onClick={(e) => e.stopPropagation()}>
        <div class="map-dialog-header">
          <h2 class="map-dialog-title">{props.title}</h2>
          <button class="map-dialog-close" onClick={props.onClose} aria-label="fechar">×</button>
        </div>
        <div class="map-dialog-body">{props.children}</div>
      </div>
    </div>
  );
}
