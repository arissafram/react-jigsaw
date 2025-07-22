import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { InitialPuzzleOptions } from '@/types';

// Type-safe deep merge utility
export const mergeOptions = (
  defaults: typeof DEFAULT_PUZZLE_OPTIONS,
  options?: InitialPuzzleOptions,
): typeof DEFAULT_PUZZLE_OPTIONS => {
  if (!options) return defaults;

  return {
    board: {
      className: options.board?.className ?? defaults.board.className,
      columns: options.board?.columns ?? defaults.board.columns,
      height: options.board?.height ?? defaults.board.height,
      rows: options.board?.rows ?? defaults.board.rows,
      showGridOutlines: options.board?.showGridOutlines ?? defaults.board.showGridOutlines,
      width: options.board?.width ?? defaults.board.width,
    },
    puzzlePiece: {
      strokeColor: options.puzzlePiece?.strokeColor ?? defaults.puzzlePiece.strokeColor,
      strokeEnabled: options.puzzlePiece?.strokeEnabled ?? defaults.puzzlePiece.strokeEnabled,
      strokeWidth: options.puzzlePiece?.strokeWidth ?? defaults.puzzlePiece.strokeWidth,
    },
    shuffleArea: options.shuffleArea ?? defaults.shuffleArea,
  };
};
