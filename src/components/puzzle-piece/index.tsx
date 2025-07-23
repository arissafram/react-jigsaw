import { RefObject, FC, useEffect } from 'react';

import { useSvgDrag } from '@/hooks/use-svg-drag';
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
  onSnapWithKeyboard?: () => void;
  registerPieceRef?: (gridKey: string, ref: SVGGElement | null) => void;
  gridKey: string;
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

  const { ref, dragState, isSnapped, moveBy, trySnap, handlers } = useSvgDrag({
    initialX,
    initialY,
    snapThreshold,
    svgRef,
    targetX,
    targetY,
    onSnap,
  });

  // Register this piece's ref with the parent
  useEffect(() => {
    if (props.registerPieceRef) {
      props.registerPieceRef(props.gridKey, ref.current);
    }

    return () => {
      if (props.registerPieceRef) {
        props.registerPieceRef(props.gridKey, null);
      }
    };
  }, [ref.current, props.registerPieceRef, props.gridKey]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSnapped) return;

    const step = 10; // 10px movement per key press

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
        trySnap();
        // Call the keyboard-specific callback for focus management
        if (props.onSnapWithKeyboard) {
          props.onSnapWithKeyboard();
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
