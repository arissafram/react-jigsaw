import styles from './styles.module.scss';
import { useDragAndDrop } from '../../hooks/use-drag-and-drop';

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
    index,
    path,
    boardWidth,
    boardHeight,
    image,
    showOutlines,
    initialX,
    initialY,
    targetX,
    targetY,
    snapThreshold,
    svgRef,
  } = props;

  const { ref, dragState, isSnapped, eventHandlers } = useDragAndDrop(
    initialX,
    initialY,
    targetX,
    targetY,
    snapThreshold,
    svgRef,
  );

  console.log('hi');

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
        stroke={isSnapped ? '' : '#b8860b'}
        strokeWidth={showOutlines ? 2 : 0}
      />
    </g>
  );
};

export default PuzzlePiece;
