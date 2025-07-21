import React from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import { generateJigsawPath, JigsawPathOptions } from '../../utils/generateJigsawPath';

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

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 600;

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { numPieces, image, rows, columns, aspectRatio, showOutlines, scramble, pieceSize } = props;

  const options: JigsawPathOptions = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    rows,
    columns,
  };

  return (
    <svg
      className={styles.board}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => (
          <PuzzlePiece
            key={`${row}-${col}`}
            index={row * columns + col}
            path={generateJigsawPath(row, col, options)}
            rows={rows}
            columns={columns}
            row={row}
            col={col}
            boardWidth={BOARD_WIDTH}
            boardHeight={BOARD_HEIGHT}
            aspectRatio={aspectRatio}
            showOutlines={showOutlines}
            scramble={scramble}
            pieceSize={pieceSize}
          />
        ))
      )}
    </svg>
  );
};

export default Board; 