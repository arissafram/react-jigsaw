import React, { useEffect, useRef, useState } from 'react';
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
const SNAP_THRESHOLD = 20;

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

  // SVG ref for drag coordinate transforms
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (scramble) {
      setPositions(scramblePieces(rows, columns, BOARD_WIDTH, BOARD_HEIGHT, pieceWidth, pieceHeight));
    } else {
      // Ordered positions (grid)
      const ordered: PiecePosition[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          ordered.push({ pieceRow: row, pieceCol: col, x: col * pieceWidth, y: row * pieceHeight });
        }
      }
      setPositions(ordered);
    }
  }, [rows, columns, scramble, pieceWidth, pieceHeight]);

  return (
    <svg
      ref={svgRef}
      className={styles.board}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      {/* Debug: show snap target areas */}
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => (
          <rect
            key={`target-${row}-${col}`}
            x={col * pieceWidth + pieceWidth / 2 - SNAP_THRESHOLD}
            y={row * pieceHeight + pieceHeight / 2 - SNAP_THRESHOLD}
            width={SNAP_THRESHOLD * 2}
            height={SNAP_THRESHOLD * 2}
            fill="red"
            opacity={0.15}
            pointerEvents="none"
          />
        ))
      )}
      {positions.map(({ pieceRow, pieceCol, x, y }, i) => (
        <PuzzlePiece
          key={`${pieceRow}-${pieceCol}`}
          index={i}
          path={generateJigsawPath(pieceRow, pieceCol, options)}
          boardWidth={BOARD_WIDTH}
          boardHeight={BOARD_HEIGHT}
          image={image}
          showOutlines={showOutlines}
          initialX={x}
          initialY={y}
          targetX={(pieceCol * pieceWidth) / 100}
          targetY={(pieceRow * pieceHeight) / 100}
          snapThreshold={SNAP_THRESHOLD}
          svgRef={svgRef}
        />
      ))}
    </svg>
  );
};

export default Board;