import { RefObject, FC } from 'react';
import styles from './styles.module.scss';
import { useDragAndDrop } from '../../hooks/use-drag-and-drop';

interface PuzzlePieceProps {
  boardHeight: number;
  boardWidth: number;
  image: string;
  index: number;
  initialX: number;
  initialY: number;
  path: string;
  showOutlines: boolean;
  snapThreshold: number;
  svgRef: RefObject<SVGSVGElement | null>;
  targetX: number;
  targetY: number;
  puzzlePieceOptions: {
    strokeColor: string;
    strokeEnabled: boolean;
    strokeWidth: number;
  };
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
  } = props;

  const { ref, dragState, isSnapped, eventHandlers } = useDragAndDrop({
    initialX,
    initialY,
    targetX,
    targetY,
    snapThreshold,
    svgRef,
  });

  return (
    <g
      ref={ref}
      transform={isSnapped ? '' : `translate(${dragState.x},${dragState.y})`}
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
