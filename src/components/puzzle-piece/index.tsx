import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index?: number;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
    const { index } = props;

    return (
        <div className={styles.puzzlePiece}>
        <h2>Puzzle Piece {index !== undefined ? `#${index + 1}` : ''}</h2>
        {/* Puzzle piece content will go here */}
        </div>
    );
};

export default PuzzlePiece; 