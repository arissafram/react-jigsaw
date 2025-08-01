import { PuzzleOptions } from '@/types';

export const DEFAULT_PUZZLE_OPTIONS: PuzzleOptions = {
  board: {
    className: '',
    columns: 4,
    height: 500,
    rows: 5,
    scatterArea: 0,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
    width: 400,
  },
  onComplete: () => {},
  onRefresh: () => {},
  puzzlePiece: {
    strokeColor: 'gold',
    strokeEnabled: true,
  },
  puzzle: {
    className: '',
    responsive: false,
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
};

export const REACT_JIGSAW_STORAGE_KEY = 'react-jigsaw';
