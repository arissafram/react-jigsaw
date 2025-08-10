import Board from '@/components/board';
import EditRowsColumns from '@/components/edit-rows-columns';
import RefreshButton from '@/components/refresh-button';
import Timer from '@/components/timer';
import { usePuzzleContext } from '@/contexts/puzzle-context';
import { PuzzleOptions } from '@/types';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.scss';

interface PuzzleContentProps {
  image: string;
  options: PuzzleOptions;
  onComplete?: () => void;
  onRefresh?: () => void;
}

const PuzzleContent: React.FC<PuzzleContentProps> = (props: PuzzleContentProps) => {
  const { image, onComplete, onRefresh, options } = props;
  const {
    columns,
    refreshBoard,
    refreshCount,
    rows,
    setBoardGrid,
    setTimerIsRunning,
    timerIsRunning,
  } = usePuzzleContext();

  const [isAnyPieceActive, setIsAnyPieceActive] = useState(false);

  useEffect(() => {
    if (!isAnyPieceActive) return;

    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('touchmove', preventTouchMove, { passive: false });
    // Safari-specific gesture zoom prevention
    window.addEventListener('gesturestart', preventGesture as EventListener, { passive: false });

    return () => {
      window.removeEventListener('touchmove', preventTouchMove);
      window.removeEventListener('gesturestart', preventGesture as EventListener);
    };
  }, [isAnyPieceActive]);

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

  const puzzleContainerStyle: React.CSSProperties = useMemo(() => {
    const aspectRatioStyle = options.puzzle.responsive
      ? ({ '--puzzle-aspect-ratio': aspectRatio.toString() } as React.CSSProperties)
      : {};

    return {
      ...aspectRatioStyle,
      touchAction: isAnyPieceActive ? 'none' : undefined,
      overscrollBehavior: isAnyPieceActive ? 'none' : undefined,
    } as React.CSSProperties;
  }, [options.puzzle.responsive, aspectRatio, isAnyPieceActive]);

  return (
    <div data-testid="puzzle-content" className={containerClasses} style={puzzleContainerStyle}>
      {options.puzzle.timer.enabled || options.puzzle.refreshButton.enabled ? (
        <div className={styles.settingsContainer}>
          {options.puzzle.timer.enabled && (
            <Timer className={options.puzzle.timer.className} isRunning={timerIsRunning} />
          )}
          {options.puzzle.refreshButton.enabled && (
            <RefreshButton
              className={options.puzzle.refreshButton.className}
              // dataTestId="refresh-button"
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
        onPuzzleComplete={handlePuzzleComplete}
        outlineStrokeColor={options.board.outlineStrokeColor}
        puzzlePieceOptions={options.puzzlePiece}
        rows={rows}
        scatterArea={options.board.scatterArea}
        showBoardSlotOutlines={options.board.showBoardSlotOutlines}
        snapThreshold={options.board.snapThreshold}
        onAnyPieceActiveChange={setIsAnyPieceActive}
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
