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
      responsive: options.board?.responsive ?? defaults.board.responsive,
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
      settings: {
        className: options.puzzle?.settings?.className ?? defaults.puzzle.settings.className,
        enabled: options.puzzle?.settings?.enabled ?? defaults.puzzle.settings.enabled,
        timer: {
          className:
            options.puzzle?.settings?.timer?.className ?? defaults.puzzle.settings.timer.className,
          enabled:
            options.puzzle?.settings?.timer?.enabled ?? defaults.puzzle.settings.timer.enabled,
        },
        refreshButton: {
          className:
            options.puzzle?.settings?.refreshButton?.className ??
            defaults.puzzle.settings.refreshButton.className,
          enabled:
            options.puzzle?.settings?.refreshButton?.enabled ??
            defaults.puzzle.settings.refreshButton.enabled,
        },
        rowsAndColumns: {
          className:
            options.puzzle?.settings?.rowsAndColumns?.className ??
            defaults.puzzle.settings.rowsAndColumns.className,
          enabled:
            options.puzzle?.settings?.rowsAndColumns?.enabled ??
            defaults.puzzle.settings.rowsAndColumns.enabled,
        },
      },
    },
  };
};
