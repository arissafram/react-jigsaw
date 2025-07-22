import { FC, useEffect, useRef, useState, useMemo } from 'react';
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
  showGridOutlines: boolean;
  width: number;
  height: number;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const { columns, image, rows, scramble = true, showGridOutlines, width, height } = props;

  // Memoize edgeMap and options
  const edgeMap = useMemo(() => computeEdgeMap(rows, columns), [rows, columns]);
  const options: JigsawPathOptions = useMemo(
    () => ({
      columns,
      edgeMap,
      height,
      rows,
      width,
    }),
    [columns, edgeMap, height, rows, width],
  );

  const pieceWidth = width / columns;
  const pieceHeight = height / rows;

  // Scrambled positions state
  const [positions, setPositions] = useState<PiecePosition[]>([]);

  // SVG ref for drag coordinate transforms
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (scramble) {
      setPositions(scramblePieces(rows, columns, width, height, pieceWidth, pieceHeight));
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
  }, [rows, columns, scramble, pieceWidth, pieceHeight, width, height]);

  return (
    <svg
      ref={svgRef}
      className={styles.board}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      {/* Board slot outlines */}
      {showGridOutlines &&
        Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: columns }).map((_, col) => (
            <path
              key={`outline-${row}-${col}`}
              d={generateJigsawPath(row, col, options)}
              fill="none"
              stroke="#bbb"
              strokeWidth={2}
              style={{ pointerEvents: 'none' }}
            />
          )),
        )}
      {positions.map(({ pieceRow, pieceCol, x, y }, i) => (
        <PuzzlePiece
          boardHeight={height}
          boardWidth={width}
          image={image}
          index={i}
          initialX={x}
          initialY={y}
          key={`${pieceRow}-${pieceCol}`}
          path={generateJigsawPath(pieceRow, pieceCol, options)}
          showOutlines={false} // placeholder for future piece outlines
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
