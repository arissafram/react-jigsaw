import { FC, useEffect, useRef, useState, useMemo } from 'react';

import PuzzlePiece from '@/components/puzzle-piece';
import { JigsawPathOptions, PiecePosition, PuzzleOptions } from '@/types';
import { generateJigsawPath, computeEdgeMap } from '@/utils/generate-jigsaw-path';

import GridOutlines from './components/grid-outlines';
import { generateGridSlots } from './helpers/generate-grid-slots';
import { shufflePieces } from './helpers/shuffle-pieces';

import styles from './styles.module.scss';

interface BoardProps {
  className: string;
  columns: number;
  height: number;
  image: string;
  onPuzzleComplete?: () => void;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  rows: number;
  showGridOutlines: boolean;
  width: number;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const {
    className,
    columns,
    height,
    image,
    onPuzzleComplete,
    puzzlePieceOptions,
    rows,
    showGridOutlines,
    width,
  } = props;

  // Shuffled pieces with random positions
  const [shuffledPieces, setShuffledPieces] = useState<PiecePosition[]>([]);

  // Track which pieces are snapped to the grid
  const [snappedPieceIds, setSnappedPieceIds] = useState<Set<string>>(new Set());

  // SVG ref for drag coordinate transforms
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Refs to track puzzle pieces by their stable ID
  const pieceRefs = useRef<Map<string, SVGGElement>>(new Map());

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

  // Generate grid slots once and memoize them
  const gridSlots = useMemo(() => generateGridSlots(rows, columns), [rows, columns]);

  useEffect(() => {
    const newShuffledPieces = shufflePieces({
      height,
      width,
      positions: gridSlots,
    });
    setShuffledPieces(newShuffledPieces);
    setSnappedPieceIds(new Set()); // Reset snapped pieces when puzzle is reshuffled
    pieceRefs.current.clear(); // Clear piece refs when grid changes
  }, [gridSlots, pieceWidth, pieceHeight, width, height]);

  // Check for puzzle completion
  useEffect(() => {
    const totalPieces = rows * columns;
    if (snappedPieceIds.size === totalPieces) {
      onPuzzleComplete?.();
    }
  }, [snappedPieceIds.size, rows, columns, onPuzzleComplete]);

  const handlePieceSnap = (index: number) => {
    const { pieceRow, pieceCol } = shuffledPieces[index];
    const gridKey = `${pieceRow}-${pieceCol}`;
    setSnappedPieceIds((prev) => new Set([...prev, gridKey]));
  };

  const handleSnapWithKeyboard = (currentIndex: number) => {
    // Find any unsnapped piece (doesn't matter which one)
    const unsnappedPiece = shuffledPieces.find((pos, idx) => {
      const gridKey = `${pos.pieceRow}-${pos.pieceCol}`;
      // Exclude the current piece that just snapped
      return idx !== currentIndex && !snappedPieceIds.has(gridKey);
    });

    if (unsnappedPiece) {
      const gridKey = `${unsnappedPiece.pieceRow}-${unsnappedPiece.pieceCol}`;
      const pieceRef = pieceRefs.current.get(gridKey);
      if (pieceRef) {
        pieceRef.focus();
      }
    }
  };

  const registerPieceRef = (gridKey: string, ref: SVGGElement | null) => {
    if (ref) {
      pieceRefs.current.set(gridKey, ref);
    } else {
      pieceRefs.current.delete(gridKey);
    }
  };

  return (
    <svg
      ref={svgRef}
      className={`${styles.board} ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <GridOutlines
        jigawOptions={jigawOptions}
        gridSlots={gridSlots}
        showGridOutlines={showGridOutlines}
        snappedPieceIds={snappedPieceIds}
      />
      {shuffledPieces.map(({ pieceRow, pieceCol, x, y }, i) => (
        <PuzzlePiece
          key={`${pieceRow}-${pieceCol}`}
          boardHeight={height}
          boardWidth={width}
          gridKey={`${pieceRow}-${pieceCol}`}
          image={image}
          index={i}
          initialX={x}
          initialY={y}
          onSnap={() => handlePieceSnap(i)}
          onSnapWithKeyboard={() => handleSnapWithKeyboard(i)}
          path={generateJigsawPath({ col: pieceCol, row: pieceRow, options: jigawOptions })}
          puzzlePieceOptions={puzzlePieceOptions}
          registerPieceRef={registerPieceRef}
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
