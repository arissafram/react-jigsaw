import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { InitialPuzzleOptions } from '@/types';

/**
 * Merges default puzzle options with user-provided options, ensuring type safety and proper merging.
 *
 * This function recursively merges the properties of the two objects, with user-provided values taking precedence.
 * It handles nested objects and arrays, ensuring that the merged result is a valid PuzzleOptions object.
 *
 * @param defaults - The default puzzle options to use as the base
 * @param options - The user-provided puzzle options to merge with the defaults
 * @returns A new PuzzleOptions object with the merged properties
 */
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
      scatterArea: options.board?.scatterArea ?? defaults.board.scatterArea,
      showBoardSlotOutlines:
        options.board?.showBoardSlotOutlines ?? defaults.board.showBoardSlotOutlines,
      snapThreshold: options.board?.snapThreshold ?? defaults.board.snapThreshold,
      width: options.board?.width ?? defaults.board.width,
    },
    onComplete: options.onComplete ?? defaults.onComplete,
    onRefresh: options.onRefresh ?? defaults.onRefresh,
    puzzlePiece: {
      strokeColor: options.puzzlePiece?.strokeColor ?? defaults.puzzlePiece.strokeColor,
      strokeEnabled: options.puzzlePiece?.strokeEnabled ?? defaults.puzzlePiece.strokeEnabled,
      strokeWidth: options.puzzlePiece?.strokeWidth ?? defaults.puzzlePiece.strokeWidth,
    },
    puzzle: {
      className: options.puzzle?.className ?? defaults.puzzle.className,
      responsive: options.puzzle?.responsive ?? defaults.puzzle.responsive,
      timer: {
        className: options.puzzle?.timer?.className ?? defaults.puzzle.timer.className,
        enabled: options.puzzle?.timer?.enabled ?? defaults.puzzle.timer.enabled,
      },
      refreshButton: {
        className:
          options.puzzle?.refreshButton?.className ?? defaults.puzzle.refreshButton.className,
        enabled: options.puzzle?.refreshButton?.enabled ?? defaults.puzzle.refreshButton.enabled,
      },
      rowsAndColumns: {
        className:
          options.puzzle?.rowsAndColumns?.className ?? defaults.puzzle.rowsAndColumns.className,
        enabled: options.puzzle?.rowsAndColumns?.enabled ?? defaults.puzzle.rowsAndColumns.enabled,
      },
    },
  };
};
