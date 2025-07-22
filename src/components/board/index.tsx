import { FC, useEffect, useRef, useState, useMemo } from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import {
  generateJigsawPath,
  JigsawPathOptions,
  computeEdgeMap,
} from '../../utils/generate-jigsaw-path';
import { shufflePieces } from './helpers/shuffle-pieces';
import GridOutlines from './components';
import { PuzzleOptions, PiecePosition } from '../../types';

interface BoardProps {
  columns: number;
  image: string;
  rows: number;
  width: number;
  height: number;
  options: PuzzleOptions;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const { columns, image, rows, width, height, options } = props;

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
    const shuffledPieces = shufflePieces({
      boardWidth: width,
      boardHeight: height,
      columns,
      pieceHeight,
      pieceWidth,
      rows,
      shuffleArea: options.shuffleArea,
    });
    setPositions(shuffledPieces);
  }, [rows, columns, pieceWidth, pieceHeight, width, height, options.shuffleArea]);

  return (
    <svg
      ref={svgRef}
      className={`${styles.board} ${options.board.className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <GridOutlines
        columns={columns}
        jigawOptions={jigawOptions}
        rows={rows}
        showGridOutlines={options.board.showGridOutlines}
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
          snapThreshold={SNAP_THRESHOLD}
          svgRef={svgRef}
          targetX={(pieceCol * pieceWidth) / 100}
          targetY={(pieceRow * pieceHeight) / 100}
          puzzlePieceOptions={options.puzzlePiece}
        />
      ))}
    </svg>
  );
};

export default Board;
