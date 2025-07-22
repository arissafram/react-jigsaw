import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider } from '../../contexts/puzzle-context';

export interface PuzzleProps {
  image: string;
  columns: number;
  rows: number;
  width?: number;
  height?: number;
  options: {
    board: {
      backgroundColor: string;
    };
    puzzlePiece: {
      strokeColor: string;
      strokeEnabled: boolean;
      strokeWidth: number;
    };
    showGridOutlines: boolean;
    shuffleArea: 'anywhere' | 'board';
  };
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 600;

const PuzzleContent: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { image, rows, columns, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, options } = props;
  // const { numPieces } = usePuzzleContext();
  return (
    <div className={styles.puzzle}>
      <Board
        image={image}
        rows={rows}
        columns={columns}
        width={width}
        height={height}
        options={options}
      />
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { rows, columns } = props;
  return (
    <PuzzleProvider rows={rows} columns={columns}>
      <PuzzleContent {...props} />
    </PuzzleProvider>
  );
};

export default Puzzle;
