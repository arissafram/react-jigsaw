import { RefObject, FC, useEffect } from 'react';

import { useDragAndDrop } from '@/hooks/use-drag-and-drop';
import { PuzzleOptions } from '@/types';

import styles from './styles.module.scss';

interface PuzzlePieceProps {
  boardHeight: number;
  boardWidth: number;
  image: string;
  index: number;
  initialX: number;
  initialY: number;
  path: string;
  snapThreshold: number;
  svgRef: RefObject<SVGSVGElement | null>;
  targetX: number;
  targetY: number;
  puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
  onSnap?: () => void;
}

const PuzzlePiece: FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const {
    boardHeight,
    boardWidth,
    image,
    index,
    initialX,
    initialY,
    path,
    snapThreshold,
    svgRef,
    targetX,
    targetY,
    puzzlePieceOptions,
    onSnap,
  } = props;

  const { ref, dragState, isSnapped, eventHandlers, movePiece, snapPiece } = useDragAndDrop({
    initialX,
    initialY,
    snapThreshold,
    svgRef,
    targetX,
    targetY,
    onSnap,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSnapped) return;

    const step = 10; // 10px movement per key press

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        movePiece(0, -step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        movePiece(0, step);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        movePiece(-step, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        movePiece(step, 0);
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        snapPiece();
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
      {...eventHandlers}
      className={styles.puzzlePiece}
      tabIndex={isSnapped ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <defs>
        <clipPath id={`piece-clip-${index}`}>
          <path d={path} />
        </clipPath>
      </defs>
      <image
        href={image}
        x={0}
        y={0}
        width={boardWidth}
        height={boardHeight}
        clipPath={`url(#piece-clip-${index})`}
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
