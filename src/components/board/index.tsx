import { FC, useEffect, useRef, useState, useMemo } from 'react';

import PuzzlePiece from '@/components/puzzle-piece';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { JigsawPathOptions, PiecePosition, PuzzleOptions, ShuffleArea } from '@/types';
import { generateJigsawPath, computeEdgeMap } from '@/utils/generate-jigsaw-path';

import GridOutlines from './components';
import { shufflePieces } from './helpers/shuffle-pieces';

import styles from './styles.module.scss';

interface BoardProps {
  columns: number;
  className: string;
  height: number;
  image: string;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  rows: number;
  showGridOutlines: boolean;
  shuffleArea: ShuffleArea;
  width: number;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const {
    className,
    columns,
    height,
    image,
    puzzlePieceOptions,
    rows,
    showGridOutlines,
    shuffleArea,
    width,
  } = props;

  // Shuffled positions state
  const [positions, setPositions] = useState<PiecePosition[]>([]);
  const [snappedPieces, setSnappedPieces] = useState<Set<number>>(new Set());

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
      shuffleArea: shuffleArea,
    });
    setPositions(shuffledPieces);
    setSnappedPieces(new Set()); // Reset snapped pieces when puzzle is reshuffled
  }, [rows, columns, pieceWidth, pieceHeight, width, height, shuffleArea]);

  const handlePieceSnap = (index: number) => {
    setSnappedPieces((prev) => new Set([...prev, index]));
  };

  const isPuzzleComplete = snappedPieces.size === positions.length;

  return (
    <svg
      ref={svgRef}
      className={`${styles.board} ${className ?? DEFAULT_PUZZLE_OPTIONS.board?.className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <GridOutlines
        columns={columns}
        jigawOptions={jigawOptions}
        rows={rows}
        showGridOutlines={showGridOutlines}
        snappedPieces={snappedPieces}
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
          puzzlePieceOptions={puzzlePieceOptions}
          onSnap={() => handlePieceSnap(i)}
        />
      ))}
    </svg>
  );
};

export default Board;
