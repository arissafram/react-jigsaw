import Board from '@/components/board';
import EditRowsColumns from '@/components/settings/components/edit-rows-columns';
import Timer from '@/components/settings/components/timer';
import RefreshButton from '@/components/settings/components/refresh-button';
import { usePuzzleContext } from '@/contexts/puzzle-context';
import { PuzzleOptions } from '@/types';

import styles from './styles.module.scss';

interface PuzzleContentProps {
  image: string;
  options: PuzzleOptions;
  onComplete?: () => void;
  onRefresh?: () => void;
}

const PuzzleContent: React.FC<PuzzleContentProps> = (props: PuzzleContentProps) => {
  const { image, options, onComplete, onRefresh } = props;
  const {
    rows,
    columns,
    setBoardGrid,
    refreshBoard,
    timerIsRunning,
    refreshCount,
    setTimerIsRunning,
  } = usePuzzleContext();

  const handleBoardSlotChange = (newRows: number, newColumns: number) => {
    setBoardGrid(newRows, newColumns);
  };

  const handleRefresh = () => {
    // Call custom refresh logic if provided
    onRefresh?.();
    // Always refresh the board
    refreshBoard();
  };

  const handlePuzzleComplete = () => {
    setTimerIsRunning(false);
    onComplete?.();
  };

  // Calculate aspect ratio for responsive behavior
  const aspectRatio = options.board.width / options.board.height;

  // Determine container classes and styles
  const containerClasses = options.puzzle.responsive
    ? `${styles.puzzle} ${styles.responsive}`
    : styles.puzzle;

  const containerStyles = options.puzzle.responsive
    ? ({ '--puzzle-aspect-ratio': aspectRatio.toString() } as React.CSSProperties)
    : {};

  return (
    <div className={containerClasses} style={{ maxWidth: options.board.width, ...containerStyles }}>
      {options.puzzle.timer.enabled || options.puzzle.refreshButton.enabled ? (
        <div className={styles.settingsContainer}>
          {options.puzzle.timer.enabled && (
            <Timer className={options.puzzle.timer.className} isRunning={timerIsRunning} />
          )}
          {options.puzzle.refreshButton.enabled && (
            <RefreshButton
              className={options.puzzle.refreshButton.className}
              onRefresh={handleRefresh}
            />
          )}
        </div>
      ) : null}
      <Board
        key={`${rows}-${columns}-${refreshCount}`}
        boardHeight={options.board.height}
        boardWidth={options.board.width}
        className={options.board.className}
        columns={columns}
        image={image}
        puzzlePieceOptions={options.puzzlePiece}
        rows={rows}
        snapThreshold={options.board.snapThreshold}
        showBoardSlotOutlines={options.board.showBoardSlotOutlines}
        scatterArea={options.board.scatterArea}
        onPuzzleComplete={handlePuzzleComplete}
      />
      {options.puzzle.rowsAndColumns.enabled && (
        <div className={styles.settingsContainer}>
          <EditRowsColumns
            className={options.puzzle.rowsAndColumns.className}
            currentRows={rows}
            currentColumns={columns}
            onBoardSlotChange={handleBoardSlotChange}
          />
        </div>
      )}
    </div>
  );
};

export default PuzzleContent;
