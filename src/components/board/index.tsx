import { FC, useEffect, useRef, useState, useMemo } from 'react';

import PuzzlePiece from '@/components/puzzle-piece';

type PieceRefs = Map<string, SVGGElement>;
import { JigsawPathOptions, PiecePosition, PuzzleOptions, SnappedPieceIds } from '@/types';
import { generateJigsawPath, computeEdgeMap } from '@/utils/generate-jigsaw-path';

import GridOutlines from './components/grid-outlines';
import { generateGridSlots } from './helpers/generate-grid-slots';
import { shufflePieces } from './helpers/shuffle-pieces';

import styles from './styles.module.scss';

interface BoardProps {
  className: string;
  columns: number;
  boardHeight: number;
  boardWidth: number;
  image: string;
  onPuzzleComplete?: () => void;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  rows: number;
  showGridOutlines: boolean;
}

const SNAP_THRESHOLD = 20;

const Board: FC<BoardProps> = (props: BoardProps) => {
  const {
    className,
    columns,
    boardHeight,
    boardWidth,
    image,
    onPuzzleComplete,
    puzzlePieceOptions,
    rows,
    showGridOutlines,
  } = props;

  const pieceHeight = boardHeight / rows;
  const pieceWidth = boardWidth / columns;

  // Shuffled pieces with random positions
  const [shuffledPieces, setShuffledPieces] = useState<PiecePosition[]>([]);

  // Track which pieces are snapped to the grid
  const [snappedPieceIds, setSnappedPieceIds] = useState<SnappedPieceIds>(new Set());

  // Board ref for drag coordinate transforms
  const boardRef = useRef<SVGSVGElement | null>(null);

  // Refs to track puzzle pieces by their stable ID
  const pieceRefs = useRef<PieceRefs>(new Map());

  // Memoize edgeMap and options
  const edgeMap = useMemo(() => computeEdgeMap({ rows, columns }), [rows, columns]);

  const jigawOptions: JigsawPathOptions = useMemo(
    () => ({
      boardHeight,
      boardWidth,
      columns,
      edgeMap,
      rows,
    }),
    [boardWidth, boardHeight, columns, edgeMap, rows],
  );

  // Generate grid slots once and memoize them
  const gridSlots = useMemo(() => generateGridSlots(rows, columns), [rows, columns]);

  useEffect(() => {
    const newShuffledPieces = shufflePieces({
      boardHeight,
      boardWidth,
      gridSlots,
    });
    setShuffledPieces(newShuffledPieces);
    setSnappedPieceIds(new Set()); // Reset snapped pieces when puzzle is reshuffled
    pieceRefs.current.clear(); // Clear piece refs when grid changes
  }, [boardHeight, boardWidth, gridSlots, pieceWidth, pieceHeight]);

  // Check for puzzle completion
  useEffect(() => {
    const totalPieces = rows * columns;
    if (snappedPieceIds.size === totalPieces) {
      onPuzzleComplete?.();
    }
  }, [snappedPieceIds.size, rows, columns, onPuzzleComplete]);

  // Mark a piece as snapped to the grid when it's placed correctly
  const handlePieceSnap = (index: number) => {
    const { pieceRow, pieceCol } = shuffledPieces[index];
    const gridKey = `${pieceRow}-${pieceCol}`;
    // Add the piece to the set of snapped pieces
    setSnappedPieceIds((prev) => new Set([...prev, gridKey]));
  };

  // Focus the next unsnapped piece for keyboard navigation after a piece snaps
  const handleSnapWithKeyboard = (currentIndex: number) => {
    // Find any unsnapped piece (doesn't matter which one)
    const unsnappedPiece = shuffledPieces.find((pos, idx) => {
      const gridKey = `${pos.pieceRow}-${pos.pieceCol}`;
      // Exclude the current piece that just snapped
      return idx !== currentIndex && !snappedPieceIds.has(gridKey);
    });

    if (unsnappedPiece) {
      const gridKey = `${unsnappedPiece.pieceRow}-${unsnappedPiece.pieceCol}`;
      // Get the DOM reference and focus the next unsnapped piece
      const pieceRef = pieceRefs.current.get(gridKey);
      if (pieceRef) {
        pieceRef.focus();
      }
    }
  };

  // Register/unregister puzzle piece refs for keyboard navigation and programmatic control
  const registerPieceRef = (gridKey: string, ref: SVGGElement | null) => {
    if (ref) {
      // Store the DOM reference when piece mounts
      pieceRefs.current.set(gridKey, ref);
    } else {
      // Remove the DOM reference when piece unmounts
      pieceRefs.current.delete(gridKey);
    }
  };

  return (
    <svg
      ref={boardRef}
      className={`${styles.board} ${className}`}
      height={boardHeight}
      width={boardWidth}
      viewBox={`0 0 ${boardWidth} ${boardHeight}`}
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
          boardHeight={boardHeight}
          boardWidth={boardWidth}
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
          boardRef={boardRef}
          targetX={(pieceCol * pieceWidth) / 100}
          targetY={(pieceRow * pieceHeight) / 100}
        />
      ))}
    </svg>
  );
};

export default Board;
