import { FC, useEffect } from 'react';

import { useMovePieces } from '@/hooks/use-move-pieces';
import { PuzzleOptions, BoardRef } from '@/types';

import styles from './styles.module.scss';

const STEP_SIZE = 10;

interface PuzzlePieceProps {
  boardHeight: number;
  boardWidth: number;
  image: string;
  pieceIndex: number;
  initialX: number;
  initialY: number;
  path: string;
  snapThreshold: number;
  boardRef: BoardRef;
  targetX: number;
  targetY: number;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  onSnap?: () => void;
  onSnapWithKeyboard?: () => void;
  registerPieceRef?: (boardSlotKey: string, ref: SVGGElement | null) => void;
  boardSlotKey: string;
}

const PuzzlePiece: FC<PuzzlePieceProps> = ({
  boardHeight,
  boardWidth,
  image,
  pieceIndex,
  initialX,
  initialY,
  path,
  snapThreshold,
  boardRef,
  targetX,
  targetY,
  puzzlePieceOptions,
  onSnap,
  onSnapWithKeyboard,
  registerPieceRef,
  boardSlotKey,
}) => {
  const { ref, dragState, isSnapped, moveBy, trySnap, handlers } = useMovePieces({
    initialX,
    initialY,
    snapThreshold,
    boardRef,
    targetX,
    targetY,
    onSnap,
  });

  // Register this piece's ref with the parent
  useEffect(() => {
    if (registerPieceRef) {
      registerPieceRef(boardSlotKey, ref.current);
    }

    return () => {
      if (registerPieceRef) {
        registerPieceRef(boardSlotKey, null);
      }
    };
  }, [ref.current, registerPieceRef, boardSlotKey]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSnapped) return;

    const step = STEP_SIZE; // 10px movement per key press

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        moveBy(0, -step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveBy(0, step);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveBy(-step, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveBy(step, 0);
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const snapSuccess = trySnap();
        // Only call the keyboard-specific callback if snap was successful
        if (snapSuccess && onSnapWithKeyboard) {
          onSnapWithKeyboard();
        }
        break;
      }
    }
  };

  // Bring element to front when dragging starts
  useEffect(() => {
    if (dragState.isDragging && ref.current && ref.current.parentNode && !isSnapped) {
      ref.current.parentNode.appendChild(ref.current);
    }
  }, [dragState.isDragging, isSnapped]);

  // Move element to back when snapped and drag ends
  useEffect(() => {
    if (!dragState.isDragging && isSnapped && ref.current && ref.current.parentNode) {
      const parent = ref.current.parentNode;
      if (parent.firstChild !== ref.current) {
        parent.insertBefore(ref.current, parent.firstChild);
      }
    }
  }, [dragState.isDragging, isSnapped]);

  return (
    <g
      ref={ref}
      transform={isSnapped ? '' : `translate(${dragState.x},${dragState.y})`}
      {...handlers}
      className={styles.puzzlePiece}
      tabIndex={isSnapped ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <defs>
        <clipPath id={`piece-clip-${pieceIndex}`}>
          <path d={path} />
        </clipPath>
      </defs>
      <image
        href={image}
        x={0}
        y={0}
        width={boardWidth}
        height={boardHeight}
        clipPath={`url(#piece-clip-${pieceIndex})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <path
        d={path}
        fill="none"
        stroke={
          isSnapped || !puzzlePieceOptions.strokeEnabled ? '' : puzzlePieceOptions.strokeColor
        }
        strokeWidth={puzzlePieceOptions.strokeEnabled ? puzzlePieceOptions.strokeWidth : 0}
      />
    </g>
  );
};

export default PuzzlePiece;
