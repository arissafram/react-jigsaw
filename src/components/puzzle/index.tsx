import React from 'react';
import styles from './styles.module.scss';
import Board from '../board';

const Puzzle: React.FC = () => {
  return (
    <div className={styles.puzzle}>
      <h2>Puzzle Component</h2>
      <Board />
    </div>
  );
};

export default Puzzle;
