import { FC, useEffect, useRef, useState, useMemo } from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import {
  generateJigsawPath,
  JigsawPathOptions,
  computeEdgeMap,
} from '../../utils/generate-jigsaw-path';
import { PiecePosition, shufflePieces } from './helpers/shuffle-pieces';
import GridOutlines from './components';

interface BoardProps {
  columns: number;
  image: string;
  rows: number;
  showGridOutlines: boolean;
  shuffle: boolean;
  width: number;
  height: number;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const { columns, image, rows, shuffle = true, showGridOutlines, width, height } = props;

  // Shuffled positions state
  const [positions, setPositions] = useState<PiecePosition[]>([]);

  // SVG ref for drag coordinate transforms
  const svgRef = useRef<SVGSVGElement | null>(null);

  const pieceWidth = width / columns;
  const pieceHeight = height / rows;

  // Memoize edgeMap and options
  const edgeMap = useMemo(() => computeEdgeMap({ rows, columns }), [rows, columns]);

  const jigawOptions: JigsawPathOptions = useMemo(
    () => ({
      columns,
      edgeMap,
      height,
      rows,
      width,
    }),
    [columns, edgeMap, height, rows, width],
  );

  useEffect(() => {
    if (shuffle) {
      setPositions(shufflePieces(rows, columns, width, height, pieceWidth, pieceHeight));
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
  }, [rows, columns, shuffle, pieceWidth, pieceHeight, width, height]);

  return (
    <svg
      ref={svgRef}
      className={styles.board}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      <GridOutlines
        columns={columns}
        jigawOptions={jigawOptions}
        rows={rows}
        showGridOutlines={showGridOutlines}
      />
      {positions.map(({ pieceRow, pieceCol, x, y }, i) => (
        <PuzzlePiece
          boardHeight={height}
          boardWidth={width}
          image={image}
          index={i}
          initialX={x}
          initialY={y}
          key={`${pieceRow}-${pieceCol}`}
          path={generateJigsawPath({ col: pieceCol, row: pieceRow, options: jigawOptions })}
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
