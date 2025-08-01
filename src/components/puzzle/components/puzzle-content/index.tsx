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
  responsive?: boolean;
}

const PuzzleContent: React.FC<PuzzleContentProps> = (props: PuzzleContentProps) => {
  const { image, options, onComplete, onRefresh, responsive } = props;
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

  return (
    <div className={styles.puzzle}>
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
        responsive={responsive}
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
