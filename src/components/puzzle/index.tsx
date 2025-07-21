import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider, usePuzzleContext } from '../../contexts/puzzle-context';

interface PuzzleProps {
  initialNumPieces: number;
}

const PuzzleContent: React.FC = () => {
  const { numPieces } = usePuzzleContext();
  return (
    <div className={styles.puzzle}>
      <h2>Puzzle Component</h2>
      <Board numPieces={numPieces} />
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { initialNumPieces } = props;
  
  return (
    <PuzzleProvider initialNumPieces={initialNumPieces}>
      <PuzzleContent />
    </PuzzleProvider>
  );
};

export default Puzzle;
