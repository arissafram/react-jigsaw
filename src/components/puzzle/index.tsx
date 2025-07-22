import Board from '../board';
import { PuzzleProvider } from '../../contexts/puzzle-context';
import { PuzzleOptions, InitialPuzzleOptions } from '../../types';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { mergeOptions } from './helpers/merge-options';

import styles from './styles.module.scss';

interface PuzzleProps {
  image: string;
  options?: InitialPuzzleOptions;
}

interface PuzzleContentProps {
  image: string;
  options: PuzzleOptions;
}

const PuzzleContent: React.FC<PuzzleContentProps> = (props: PuzzleContentProps) => {
  const { image, options } = props;

  return (
    <div className={styles.puzzle}>
      <p>settings</p>
      <Board
        className={options.board.className}
        columns={options.board.columns}
        height={options.board.height}
        image={image}
        puzzlePieceOptions={options.puzzlePiece}
        rows={options.board.rows}
        showGridOutlines={options.board.showGridOutlines}
        shuffleArea={options.shuffleArea}
        width={options.board.width}
      />
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { options } = props;
  const mergedOptions: PuzzleOptions = mergeOptions(DEFAULT_PUZZLE_OPTIONS, options);

  return (
    <PuzzleProvider rows={mergedOptions.board.rows} columns={mergedOptions.board.columns}>
      <PuzzleContent {...props} options={mergedOptions} />
    </PuzzleProvider>
  );
};

export default Puzzle;
