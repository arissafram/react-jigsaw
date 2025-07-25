import { createContext, useContext, useState } from 'react';

// Define the shape of the puzzle context state
interface PuzzleContextState {
  columns: number;
  numPieces: number;
  rows: number;
  timerIsRunning: boolean;
  refreshCount: number;
  setBoardGrid: (rows: number, columns: number) => void;
  refreshBoard: () => void;
  setTimerIsRunning: (running: boolean) => void;
}

const PuzzleContext = createContext<PuzzleContextState | undefined>(undefined);

interface PuzzleProviderProps {
  children: React.ReactNode;
  columns: number;
  rows: number;
}

export const PuzzleProvider: React.FC<PuzzleProviderProps> = (props: PuzzleProviderProps) => {
  const { children, columns: initialColumns, rows: initialRows } = props;
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const [timerIsRunning, setTimerIsRunning] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const numPieces = rows * columns;

  const setBoardGrid = (newRows: number, newColumns: number) => {
    setRows(newRows);
    setColumns(newColumns);
    setTimerIsRunning(false);
    setTimeout(() => setTimerIsRunning(true), 10);
  };

  const refreshBoard = () => {
    setTimerIsRunning(false);
    setRefreshCount((c) => c + 1);

    // 10ms workaround to ensure the timer is running after the board is refreshed
    setTimeout(() => setTimerIsRunning(true), 10);
  };

  const value: PuzzleContextState = {
    columns,
    numPieces,
    rows,
    timerIsRunning,
    refreshCount,
    setBoardGrid,
    refreshBoard,
    setTimerIsRunning,
  };

  return <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>;
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};
