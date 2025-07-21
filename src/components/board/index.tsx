import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import { generateJigsawPath, JigsawPathOptions, computeEdgeMap } from '../../utils/generate-jigsaw-path';
import { PiecePosition, scramblePieces } from './helpers/scramble-pieces';

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
  const { numPieces, image, rows, columns, aspectRatio, showOutlines, scramble = true, pieceSize } = props;

  // Compute edgeMap once for the whole puzzle
  const edgeMap = computeEdgeMap(rows, columns);

  const options: JigsawPathOptions = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    rows,
    columns,
    edgeMap,
  };

  const pieceWidth = BOARD_WIDTH / columns;
  const pieceHeight = BOARD_HEIGHT / rows;

  // Scrambled positions state
  const [positions, setPositions] = useState<PiecePosition[]>([]);

  useEffect(() => {
    if (scramble) {
      setPositions(scramblePieces(rows, columns, BOARD_WIDTH, BOARD_HEIGHT, pieceWidth, pieceHeight));
    } else {
      // Ordered positions (grid)
      const ordered: PiecePosition[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          ordered.push({ row, col, x: col * pieceWidth, y: row * pieceHeight });
        }
      }
      setPositions(ordered);
    }
  }, [rows, columns, scramble, pieceWidth, pieceHeight]);

  return (
    <svg
      className={styles.board}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      {positions.map(({ row, col, x, y }, i) => (
        <g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
          <PuzzlePiece
            index={i}
            path={generateJigsawPath(row, col, options)}
            boardWidth={BOARD_WIDTH}
            boardHeight={BOARD_HEIGHT}
            image={image}
            showOutlines={showOutlines}
          />
        </g>
      ))}
    </svg>
  );
};

export default Board; 