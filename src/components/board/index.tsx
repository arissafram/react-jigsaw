import React from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';

interface BoardProps {
  numPieces: number;
  image: string;
  rows: number;
  columns: number;
  aspectRatio: string;
  showOutlines: boolean;
  scramble: boolean;
  pieceSize: 's' | 'm' | 'l';
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { numPieces, image, rows, columns, aspectRatio, showOutlines, scramble, pieceSize } = props;

  return (
    <div className={styles.board}>
      {[...Array(numPieces)].map((_, i) => (
        <PuzzlePiece
          key={i}
          index={i}
          image={image}
          rows={rows}
          columns={columns}
          aspectRatio={aspectRatio}
          showOutlines={showOutlines}
          scramble={scramble}
          pieceSize={pieceSize}
        />
      ))}
    </div>
  );
};

export default Board; 