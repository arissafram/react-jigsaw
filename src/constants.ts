import { PuzzleOptions } from '@/types';

export const DEFAULT_PUZZLE_OPTIONS: PuzzleOptions = {
  board: {
    className: '',
    columns: 3,
    height: 500,
    outlineStrokeColor: '#000',
    rows: 4,
    scatterArea: 0,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
    width: 400,
  },
  checkLocalStorage: false,
  onComplete: () => {},
  onRefresh: () => {},
  puzzlePiece: {
    strokeColor: 'gold',
    strokeEnabled: true,
  },
  puzzle: {
    className: '',
    responsive: true,
    timer: {
      className: '',
      enabled: true,
    },
    refreshButton: {
      className: '',
      enabled: true,
    },
    rowsAndColumns: {
      className: '',
      enabled: false,
    },
  },
};

export const REACT_JIGSAW_STORAGE_KEY = 'react-jigsaw';

export const STROKE_WIDTH = 2;
