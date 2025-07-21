import React from 'react';
import styles from './styles.module.scss';

const PuzzlePiece: React.FC = () => {
  return (
    <div className={styles.puzzlePiece}>
      <h2>Puzzle Piece Component</h2>
      {/* Puzzle piece content will go here */}
    </div>
  );
};

export default PuzzlePiece; 