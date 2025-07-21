import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index: number;
  image: string;
  rows: number;
  columns: number;
  aspectRatio: string;
  showOutlines: boolean;
  scramble: boolean;
  pieceSize: 's' | 'm' | 'l';
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const { index, image, rows, columns, aspectRatio, showOutlines, scramble, pieceSize } = props;
  return (
    <div className={styles.puzzlePiece}>
      <h2>Puzzle Piece #{index + 1}</h2>
      <div>pieceSize: {pieceSize}</div>
      {/* More debug info can be added here as needed */}
    </div>
  );
};

export default PuzzlePiece; 