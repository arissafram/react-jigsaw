import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index: number;
  path: string;
  image: string;
  rows: number;
  columns: number;
  aspectRatio: string;
  showOutlines: boolean;
  scramble: boolean;
  pieceSize: 's' | 'm' | 'l';
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const { index, path, image, rows, columns, aspectRatio, showOutlines, scramble, pieceSize } = props;
  return (
    <g className={styles.puzzlePiece}>
      <path d={path} fill="#fffbe6" stroke="#b8860b" strokeWidth={showOutlines ? 2 : 0} />
      {/* Debug info */}
      <title>{`Piece #${index + 1}\n${path}`}</title>
    </g>
  );
};

export default PuzzlePiece; 