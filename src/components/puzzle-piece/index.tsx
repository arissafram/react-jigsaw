import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useDraggablePiece } from '../../hooks/drag-and-drop/useDraggablePiece';

interface PuzzlePieceProps {
  index: number;
  path: string;
  boardWidth: number;
  boardHeight: number;
  image: string;
  showOutlines: boolean;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  snapThreshold: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const {
    index, path, boardWidth, boardHeight, image, showOutlines, initialX, initialY, targetX, targetY, snapThreshold, svgRef
  } = props;

  const { ref, dragState, isSnapped, eventHandlers } = useDraggablePiece(initialX, initialY, targetX, targetY, snapThreshold, svgRef);

  useEffect(() => {
    // Debug log for each piece
    // eslint-disable-next-line no-console
    console.log(`Piece ${index}: initial=(${initialX},${initialY}), target=(${targetX},${targetY}), drag=(${dragState.x},${dragState.y}), snapped=${isSnapped}`);
  }, [index, initialX, initialY, targetX, targetY, dragState.x, dragState.y, isSnapped]);

  return (
    <g
      ref={ref}
      transform={isSnapped ? '' :`translate(${dragState.x},${dragState.y})`}
      {...eventHandlers}
      className={styles.puzzlePiece}
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
      <path d={path} 
        fill="none" 
        stroke={isSnapped ? "" : "#b8860b"}
        strokeWidth={showOutlines ? 2 : 0} 
      />
    </g>
  );
};

export default PuzzlePiece;
