import React from 'react';
import styles from './styles.module.scss';
import PuzzlePiece from '../puzzle-piece';
import { generateClipPaths } from '../../utils/generateClipPaths';
import { JigsawPathOptions } from '../../utils/generateJigsawPath';

interface BoardProps {
  numPieces: number;
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

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { numPieces, image, rows, columns, aspectRatio, showOutlines, scramble, pieceSize } = props;

  const options: JigsawPathOptions = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    rows,
    columns,
  };
  const paths = generateClipPaths(options);

  return (
    <svg
      className={styles.board}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      style={{ background: '#eaf6ff', borderRadius: 10 }}
    >
      {paths.map((path, i) => (
        <PuzzlePiece
          key={i}
          index={i}
          path={path}
          image={image}
          rows={rows}
          columns={columns}
          aspectRatio={aspectRatio}
          showOutlines={showOutlines}
          scramble={scramble}
          pieceSize={pieceSize}
        />
      ))}
    </svg>
  );
};

export default Board; 