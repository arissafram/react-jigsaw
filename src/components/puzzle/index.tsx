import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider } from '../../contexts/puzzle-context';

export interface PuzzleProps {
  image: string;
  options: {
    board: {
      backgroundColor: string;
      columns: number;
      height: number;
      rows: number;
      showGridOutlines: boolean;
      width: number;
    };
    puzzlePiece: {
      strokeColor: string;
      strokeEnabled: boolean;
      strokeWidth: number;
    };
    shuffleArea: 'anywhere' | 'board';
  };
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 600;

const PuzzleContent: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { image, options } = props;
  // const { numPieces } = usePuzzleContext();
  return (
    <div className={styles.puzzle}>
      <Board
        image={image}
        rows={options.board.rows}
        columns={options.board.columns}
        width={options.board.width || DEFAULT_WIDTH}
        height={options.board.height || DEFAULT_HEIGHT}
        options={options}
      />
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { options } = props;
  return (
    <PuzzleProvider rows={options.board.rows} columns={options.board.columns}>
      <PuzzleContent {...props} />
    </PuzzleProvider>
  );
};

export default Puzzle;
