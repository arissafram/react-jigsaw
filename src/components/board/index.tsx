import React from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';

interface BoardProps {
  numPieces: number; // required
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { numPieces } = props;

  return (
    <div className={styles.board}>
      <h2>Board Component</h2>
      {Array.from({ length: numPieces }).map((_, i) => (
        <PuzzlePiece key={i} index={i} />
      ))}
    </div>
  );
};

export default Board; 