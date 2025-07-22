import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import {
  generateJigsawPath,
  JigsawPathOptions,
  computeEdgeMap,
} from '../../utils/generate-jigsaw-path';
import { PiecePosition, scramblePieces } from './helpers/scramble-pieces';

interface BoardProps {
  columns: number;
  image: string;
  rows: number;
  scramble: boolean;
  showOutlines: boolean;
}

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 600;
const SNAP_THRESHOLD = 20;

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { columns, image, rows, scramble = true, showOutlines } = props;

  // Compute edgeMap once for the whole puzzle
  const edgeMap = computeEdgeMap(rows, columns);

  const options: JigsawPathOptions = {
    columns,
    edgeMap,
    height: BOARD_HEIGHT,
    rows,
    width: BOARD_WIDTH,
  };

  const pieceWidth = BOARD_WIDTH / columns;
  const pieceHeight = BOARD_HEIGHT / rows;

  // Scrambled positions state
  const [positions, setPositions] = useState<PiecePosition[]>([]);

  // SVG ref for drag coordinate transforms
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (scramble) {
      setPositions(
        scramblePieces(rows, columns, BOARD_WIDTH, BOARD_HEIGHT, pieceWidth, pieceHeight),
      );
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
            fill="red"
            height={SNAP_THRESHOLD * 2}
            opacity={0.15}
            pointerEvents="none"
            width={SNAP_THRESHOLD * 2}
            x={col * pieceWidth + pieceWidth / 2 - SNAP_THRESHOLD}
            y={row * pieceHeight + pieceHeight / 2 - SNAP_THRESHOLD}
          />
        )),
      )}
      {positions.map(({ pieceRow, pieceCol, x, y }, i) => (
        <PuzzlePiece
          boardHeight={BOARD_HEIGHT}
          boardWidth={BOARD_WIDTH}
          image={image}
          index={i}
          initialX={x}
          initialY={y}
          key={`${pieceRow}-${pieceCol}`}
          path={generateJigsawPath(pieceRow, pieceCol, options)}
          showOutlines={showOutlines}
          snapThreshold={SNAP_THRESHOLD}
          svgRef={svgRef}
          targetX={(pieceCol * pieceWidth) / 100}
          targetY={(pieceRow * pieceHeight) / 100}
        />
      ))}
    </svg>
  );
};

export default Board;
