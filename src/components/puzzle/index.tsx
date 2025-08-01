import { PuzzleProvider } from '@/contexts/puzzle-context';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleOptions, InitialPuzzleOptions } from '@/types';

import { mergeOptions } from './helpers/merge-options';

import PuzzleContent from './components/puzzle-content';

interface PuzzleProps {
  image: string;
  options?: InitialPuzzleOptions;
  onComplete?: () => void;
  onRefresh?: () => void;
  responsive?: boolean;
}

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { options } = props;
  const mergedOptions: PuzzleOptions = mergeOptions(DEFAULT_PUZZLE_OPTIONS, options);

  return (
    <PuzzleProvider
      checkLocalStorage={mergedOptions.checkLocalStorage}
      columns={mergedOptions.board.columns}
      rows={mergedOptions.board.rows}
    >
      <PuzzleContent {...props} options={mergedOptions} />
    </PuzzleProvider>
  );
};

export default Puzzle;
