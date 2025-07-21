import React from 'react';
import styles from './styles.module.scss';

interface PuzzlePieceProps {
  index: number;
  path: string;
  image: string;
  rows: number;
  columns: number;
  aspectRatio: string;
  showOutlines: boolean;
  scramble: boolean;
  pieceSize: 's' | 'm' | 'l';
}

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 600;

const PuzzlePiece: React.FC<PuzzlePieceProps> = (props: PuzzlePieceProps) => {
  const { index, path, image, showOutlines } = props;
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
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        clipPath={`url(#piece-clip-${index})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <path d={path} fill="none" stroke="#b8860b" strokeWidth={showOutlines ? 2 : 0} />
    </g>
  );
};

export default PuzzlePiece; 