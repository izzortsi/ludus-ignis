// Collectible-card metadata for the Cinder modal's Galeria. Each card
// pairs a dense-ASCII scene from the intro with a short title + caption.
// The art arrays are imported from the intro's scene-art so the gallery
// stays in lockstep with the intro flashbacks.

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
