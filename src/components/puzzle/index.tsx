import { useState } from 'react';
import Board from '@/components/board';
import Settings from '@/components/settings';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleProvider, usePuzzleContext } from '@/contexts/puzzle-context';
import { PuzzleOptions, InitialPuzzleOptions } from '@/types';

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
  const { rows, columns, setRows, setColumns } = usePuzzleContext();
  const [timerIsRunning, setTimerIsRunning] = useState(true);

  const handleGridChange = (newRows: number, newColumns: number) => {
    setRows(newRows);
    setColumns(newColumns);
    // Restart timer when grid changes
    setTimerIsRunning(false);
    setTimeout(() => setTimerIsRunning(true), 10);
  };

  const handleRefresh = () => {
    // Force Board re-render by temporarily changing then restoring values
    const currentRows = rows;
    const currentColumns = columns;
    // Trigger state change to force re-render
    setRows(0);
    setColumns(0);
    // Restart timer when refreshing
    setTimerIsRunning(false);
    // Use setTimeout to ensure the state change is processed
    setTimeout(() => {
      setRows(currentRows);
      setColumns(currentColumns);
      setTimerIsRunning(true);
    }, 10);
  };

  const handlePuzzleComplete = () => {
    setTimerIsRunning(false);
  };

  return (
    <div
      className={styles.puzzle}
      style={{ width: `${options.board.width}px`, height: `${options.board.height}px` }}
    >
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
        onPuzzleComplete={handlePuzzleComplete}
      />
      <Settings
        currentRows={rows}
        currentColumns={columns}
        onGridChange={handleGridChange}
        onRefresh={handleRefresh}
        timerIsRunning={timerIsRunning}
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
