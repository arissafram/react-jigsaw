import { PuzzleOptions } from '@/types';

export const DEFAULT_PUZZLE_OPTIONS: PuzzleOptions = {
  board: {
    className: '',
    columns: 4,
    height: 500,
    rows: 5,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
    width: 400,
  },
  puzzlePiece: {
    strokeColor: 'gold',
    strokeEnabled: true,
    strokeWidth: 2,
  },
  puzzle: {
    className: '',
    settings: {
      className: '',
      enabled: false,
      timer: {
        className: '',
        enabled: false,
      },
      refreshButton: {
        className: '',
        enabled: false,
      },
      rowsAndColumns: {
        className: '',
        enabled: false,
      },
    },
  },
};

export const REACT_JIGSAW_STORAGE_KEY = 'react-jigsaw';
