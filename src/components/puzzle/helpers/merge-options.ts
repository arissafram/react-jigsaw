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
      shuffleArea: options.shuffleArea ?? defaults.board.shuffleArea,
      width: options.board?.width ?? defaults.board.width,
    },
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
