import Board from '@/components/board';
import Settings from '@/components/settings';
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
  const containerClasses = options.board.responsive
    ? `${styles.puzzle} ${styles.responsive}`
    : styles.puzzle;

  const containerStyles = options.board.responsive
    ? ({ '--puzzle-aspect-ratio': aspectRatio.toString() } as React.CSSProperties)
    : {};

  return (
    <div className={containerClasses} style={{ maxWidth: options.board.width, ...containerStyles }}>
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
      <Settings
        currentRows={rows}
        currentColumns={columns}
        onBoardSlotChange={handleBoardSlotChange}
        onRefresh={handleRefresh}
        timerIsRunning={timerIsRunning}
        settings={options.puzzle.settings}
      />
    </div>
  );
};

export default PuzzleContent;
