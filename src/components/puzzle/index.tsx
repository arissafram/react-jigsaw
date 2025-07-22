import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider } from '../../contexts/puzzle-context';
import { PuzzleOptions, InitialPuzzleOptions } from '../../types';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';

interface PuzzleProps {
  image: string;
  options?: InitialPuzzleOptions;
}

interface PuzzleContentProps {
  image: string;
  options: PuzzleOptions;
}

// Type-safe deep merge utility
function mergeOptions(
  defaults: typeof DEFAULT_PUZZLE_OPTIONS,
  options?: InitialPuzzleOptions,
): typeof DEFAULT_PUZZLE_OPTIONS {
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
}

const PuzzleContent: React.FC<PuzzleContentProps> = (props: PuzzleContentProps) => {
  const { image, options } = props;

  // const mergedOptions = mergeOptions(DEFAULT_PUZZLE_OPTIONS, options);

  return (
    <div className={styles.puzzle}>
      <p>settings</p>
      <Board
        className={options.board.className}
        columns={options.board.columns}
        height={options.board.height}
        image={image}
        puzzlePieceOptions={options.puzzlePiece}
        rows={options.board.rows}
        showGridOutlines={options.board.showGridOutlines}
        shuffleArea={options.shuffleArea}
        width={options.board.width}
      />
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { options } = props;
  const mergedOptions: PuzzleOptions = mergeOptions(DEFAULT_PUZZLE_OPTIONS, options);

  return (
    <PuzzleProvider rows={mergedOptions.board.rows} columns={mergedOptions.board.columns}>
      <PuzzleContent {...props} options={mergedOptions} />
    </PuzzleProvider>
  );
};

export default Puzzle;
