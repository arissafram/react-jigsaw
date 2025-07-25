import { PuzzleProvider } from '@/contexts/puzzle-context';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleOptions, InitialPuzzleOptions } from '@/types';

import { mergeOptions } from './helpers/merge-options';

import PuzzleContent from './components/puzzle-content';

interface PuzzleProps {
  image: string;
  options?: InitialPuzzleOptions;
  onComplete?: () => void;
}

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
