import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index: number;
  path: string;
  rows: number;
  columns: number;
  row: number;
  col: number;
  boardWidth: number;
  boardHeight: number;
  aspectRatio: string;
  showOutlines: boolean;
  scramble: boolean;
  pieceSize: 's' | 'm' | 'l';
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const {
    path, showOutlines
  } = props;

  return (
    <g className={styles.puzzlePiece}>
      <path d={path} fill="none" stroke="#b8860b" strokeWidth={showOutlines ? 2 : 0} />
    </g>
  );
};

export default PuzzlePiece;
