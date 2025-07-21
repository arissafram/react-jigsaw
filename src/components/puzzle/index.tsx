import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';

const Puzzle: React.FC = () => {
  return (
    <div className={styles.puzzle}>
      <h2>Puzzle Component</h2>
      <Board numPieces={4} />
    </div>
  );
};

export default Puzzle;
