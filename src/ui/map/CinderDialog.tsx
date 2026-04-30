import { MapDialog } from './MapDialog';
import { CinderView } from '../components/CinderView';
import { StudyView } from '../components/StudyView';

interface Props {
  onClose: () => void;
}

export function CinderDialog(props: Props) {
  return (
    <MapDialog title="Cinder" onClose={props.onClose}>
      <CinderView />
      <StudyView />
    </MapDialog>
  );
}
