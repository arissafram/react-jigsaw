import Board from '@/components/board';
import Settings from '@/components/settings';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleProvider, usePuzzleContext } from '@/contexts/puzzle-context';
import { PuzzleOptions, InitialPuzzleOptions } from '@/types';

import { mergeOptions } from './helpers/merge-options';

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
  const { rows, columns, setRows, setColumns } = usePuzzleContext();

  const handleGridChange = (newRows: number, newColumns: number) => {
    setRows(newRows);
    setColumns(newColumns);
  };

  const handleRefresh = () => {
    // Force a re-render by updating the key - this will shuffle the pieces
    setRows(rows);
    setColumns(columns);
  };

  return (
    <>
      <Board
        key={`${rows}-${columns}`}
        className={options.board.className}
        columns={columns}
        height={options.board.height}
        image={image}
        puzzlePieceOptions={options.puzzlePiece}
        rows={rows}
        showGridOutlines={options.board.showGridOutlines}
        shuffleArea={options.shuffleArea}
        width={options.board.width}
      />
      <Settings
        currentRows={rows}
        currentColumns={columns}
        onGridChange={handleGridChange}
        onRefresh={handleRefresh}
      />
    </>
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
