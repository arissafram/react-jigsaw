import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index: number;
  path: string;
  boardWidth: number;
  boardHeight: number;
  image: string;
  showOutlines: boolean;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const {
    index, path, boardWidth, boardHeight, image, showOutlines
  } = props;

  return (
    <g className={styles.puzzlePiece}>
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
      <path d={path} fill="none" stroke="#b8860b" strokeWidth={showOutlines ? 2 : 0} />
    </g>
  );
};

export default PuzzlePiece;
