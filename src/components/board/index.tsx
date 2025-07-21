import React from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
      <h2>Board Component</h2>
      <PuzzlePiece />
      <PuzzlePiece />
    </div>
  );
};

export default Board; 