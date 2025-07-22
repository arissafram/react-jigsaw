import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider, usePuzzleContext } from '../../contexts/puzzle-context';

export interface PuzzleProps {
  image: string;
  columns: number;
  rows: number;
  scramble?: boolean;
  showGridOutlines?: boolean;
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 600;

const PuzzleContent: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const {
    image,
    rows,
    columns,
    scramble = true,
    showGridOutlines = true,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
  } = props;
  // const { numPieces } = usePuzzleContext();
  return (
    <div className={styles.puzzle}>
      <Board
        image={image}
        rows={rows}
        columns={columns}
        scramble={scramble}
        showGridOutlines={showGridOutlines}
        width={width}
        height={height}
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
