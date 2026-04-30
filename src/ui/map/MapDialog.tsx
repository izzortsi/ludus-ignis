import { JSX } from 'solid-js';

interface Props {
  title: string;
  onClose: () => void;
  children: JSX.Element;
}

export function MapDialog(props: Props) {
  return (
    <div class="map-dialog-backdrop" onClick={props.onClose}>
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
