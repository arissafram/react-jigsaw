import { FC, useEffect, useRef, useState, useMemo } from 'react';

import PuzzlePiece from '@/components/puzzle-piece';

import { BoardPathOptions, PiecePosition, PuzzleOptions, SnappedPieceIds } from '@/types';
import { generateBoardPath, computeEdgeMap } from '@/components/board/helpers/generate-board-path';

import BoardOutlines from './components/board-outlines';
import { generateBoardSlots } from './helpers/generate-board-slots';
import { shufflePieces } from './helpers/shuffle-pieces';

import styles from './styles.module.scss';

type PieceRefs = Map<string, SVGGElement>;
interface BoardProps {
  boardHeight: number;
  boardWidth: number;
  className: string;
  columns: number;
  image: string;
  onPuzzleComplete?: () => void;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  rows: number;
  showBoardSlotOutlines: boolean;
  snapThreshold: number;
  scatterAreaExpansion?: number;
}

const Board: FC<BoardProps> = (props: BoardProps) => {
  const {
    boardHeight,
    boardWidth,
    className,
    columns,
    image,
    onPuzzleComplete,
    puzzlePieceOptions,
    rows,
    showBoardSlotOutlines,
    snapThreshold,
    scatterAreaExpansion,
  } = props;

  const pieceHeight = boardHeight / rows;
  const pieceWidth = boardWidth / columns;

  // Shuffled pieces with random positions
  const [shuffledPieces, setShuffledPieces] = useState<PiecePosition[]>([]);

  // Track which pieces are snapped to the board
  const [snappedPieceIds, setSnappedPieceIds] = useState<SnappedPieceIds>(new Set());

  // Board ref for drag coordinate transforms
  const boardRef = useRef<SVGSVGElement | null>(null);

  // Refs to track puzzle pieces by their stable ID
  const pieceRefs = useRef<PieceRefs>(new Map());

  // Memoize edgeMap and options
  const edgeMap = useMemo(() => computeEdgeMap({ rows, columns }), [rows, columns]);

  // Memoize boardPathOptions to avoid unnecessary recalculations and re-renders
  // Only recompute when board dimensions, columns, rows, or edgeMap change
  const boardPathOptions: BoardPathOptions = useMemo(
    () => ({
      boardHeight,
      boardWidth,
      columns,
      edgeMap,
      rows,
    }),
    [boardHeight, boardWidth, columns, edgeMap, rows],
  );

  // Generate board slots once and memoize them
  const boardSlots = useMemo(() => generateBoardSlots(rows, columns), [rows, columns]);

  useEffect(() => {
    const newShuffledPieces = shufflePieces({
      boardHeight,
      boardWidth,
      rows,
      columns,
      boardSlots,
      scatterAreaExpansion,
    });
    setShuffledPieces(newShuffledPieces);
    setSnappedPieceIds(new Set()); // Reset snapped pieces when puzzle is reshuffled
    pieceRefs.current.clear(); // Clear piece refs when board changes
  }, [boardHeight, boardWidth, boardSlots, rows, columns, scatterAreaExpansion]);

  // Check for puzzle completion
  useEffect(() => {
    const totalPieces = rows * columns;
    if (snappedPieceIds.size === totalPieces) {
      onPuzzleComplete?.();
    }
  }, [snappedPieceIds.size, rows, columns, onPuzzleComplete]);

  // Mark a piece as snapped to the board when it's placed correctly
  const handlePieceSnap = (pieceIndex: number) => {
    const { pieceRow, pieceCol } = shuffledPieces[pieceIndex];
    const boardSlotKey = `${pieceRow}-${pieceCol}`;
    // Add the piece to the set of snapped pieces
    setSnappedPieceIds((prev) => new Set([...prev, boardSlotKey]));
  };

  // Focus the next unsnapped piece for keyboard navigation after a piece snaps
  const handleSnapWithKeyboard = (currentPieceIndex: number) => {
    // Find any unsnapped piece (doesn't matter which one)
    const unsnappedPiece = shuffledPieces.find((pos, idx) => {
      const boardSlotKey = `${pos.pieceRow}-${pos.pieceCol}`;
      // Exclude the current piece that just snapped
      return idx !== currentPieceIndex && !snappedPieceIds.has(boardSlotKey);
    });

    if (unsnappedPiece) {
      const boardSlotKey = `${unsnappedPiece.pieceRow}-${unsnappedPiece.pieceCol}`;
      // Get the DOM reference and focus the next unsnapped piece
      const pieceRef = pieceRefs.current.get(boardSlotKey);
      if (pieceRef) {
        pieceRef.focus();
      }
    }
  };

  // Register/unregister puzzle piece refs for keyboard navigation and programmatic control
  const registerPieceRef = (boardSlotKey: string, ref: SVGGElement | null) => {
    if (ref) {
      // Store the DOM reference when piece mounts
      pieceRefs.current.set(boardSlotKey, ref);
    } else {
      // Remove the DOM reference when piece unmounts
      pieceRefs.current.delete(boardSlotKey);
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
      <BoardOutlines
        boardPathOptions={boardPathOptions}
        boardSlots={boardSlots}
        showBoardSlotOutlines={showBoardSlotOutlines}
        snappedPieceIds={snappedPieceIds}
      />
      {shuffledPieces.map(({ pieceRow, pieceCol, x, y }, pieceIndex) => (
        <PuzzlePiece
          key={`${pieceRow}-${pieceCol}`}
          boardHeight={boardHeight}
          boardWidth={boardWidth}
          boardSlotKey={`${pieceRow}-${pieceCol}`}
          image={image}
          pieceIndex={pieceIndex}
          initialX={x}
          initialY={y}
          onSnap={() => handlePieceSnap(pieceIndex)}
          onSnapWithKeyboard={() => handleSnapWithKeyboard(pieceIndex)}
          path={generateBoardPath({ col: pieceCol, row: pieceRow, options: boardPathOptions })}
          puzzlePieceOptions={puzzlePieceOptions}
          registerPieceRef={registerPieceRef}
          snapThreshold={snapThreshold}
          boardRef={boardRef}
          targetX={(pieceCol * pieceWidth) / 100}
          targetY={(pieceRow * pieceHeight) / 100}
        />
      ))}
    </svg>
  );
};

export default Board;
