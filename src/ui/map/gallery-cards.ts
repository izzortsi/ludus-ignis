// Collectible-card metadata for the Cinder modal's Galeria. Each card pairs
// a dense-ASCII scene from the intro with a stable id; the localized title
// + caption come from the i18n dict (gallery.cards.<id>) so adding a locale
// is a one-key edit instead of a data change here.
//
// The fallback `title` / `caption` fields exist for forward-compat — if the
// dict doesn't yet have a card id, the UI uses these as last-resort.

import { RIO_MIYAKE, MIRROR_LEAK, RIO_DIMS, MIRROR_DIMS } from '../intro/scene-art';

export interface GalleryCard {
  id: string;
  title: string;
  caption: string;
  art: string[];
  cols: number;
  rows: number;
}

export const GALLERY: GalleryCard[] = [
  {
    id: 'rio-miyake',
    title: 'A Tempestade',
    caption:
      'Quando o Sol soltou a serpente verde sobre as cidades do litoral. As redes de aço silenciaram em horas; as palavras que cruzavam os mares emudeceram em uma semana.',
    art: RIO_MIYAKE,
    cols: RIO_DIMS.cols,
    rows: RIO_DIMS.rows
  },
  {
    id: 'mirror-leak',
    title: 'O Vazamento',
    caption:
      'Quando os antigos, famintos, *espelharam* a vida, uma das metades fugiu dos campos do norte. Dela nasce a maré-espelho — e ainda intensifica para o sul.',
    art: MIRROR_LEAK,
    cols: MIRROR_DIMS.cols,
    rows: MIRROR_DIMS.rows
  }
];
