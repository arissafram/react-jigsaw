import { REACT_JIGSAW_STORAGE_KEY } from '@/constants';
import { createContext, useContext, useState } from 'react';

// Define the shape of the puzzle context state
interface PuzzleContextState {
  columns: number;
  numPieces: number;
  refreshCount: number;
  rows: number;
  timerIsRunning: boolean;
  setBoardGrid: (rows: number, columns: number) => void;
  refreshBoard: () => void;
  setTimerIsRunning: (running: boolean) => void;
}

const PuzzleContext = createContext<PuzzleContextState | undefined>(undefined);

interface PuzzleProviderProps {
  checkLocalStorage: boolean;
  children: React.ReactNode;
  columns: number;
  rows: number;
}

// On first mount, check localStorage for saved values
const getInitialBoardConfig = (checkLocalStorage: boolean) => {
  if (typeof window !== 'undefined' && checkLocalStorage) {
    const boardConfig = localStorage.getItem(REACT_JIGSAW_STORAGE_KEY);
    if (boardConfig) {
      const parsed = JSON.parse(boardConfig);
      if (typeof parsed.rows === 'number' && typeof parsed.columns === 'number') {
        return { rows: parsed.rows, columns: parsed.columns };
      }
    }
  }
  return {};
};

export const PuzzleProvider: React.FC<PuzzleProviderProps> = (props: PuzzleProviderProps) => {
  const { rows: rowsFromStorage, columns: columnsFromStorage } = getInitialBoardConfig(
    props.checkLocalStorage,
  );

  const [columns, setColumns] = useState(columnsFromStorage ?? props.columns);
  const [rows, setRows] = useState(rowsFromStorage ?? props.rows);
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
    refreshCount,
    rows,
    timerIsRunning,
    setBoardGrid,
    refreshBoard,
    setTimerIsRunning,
  };

  return <PuzzleContext.Provider value={value}>{props.children}</PuzzleContext.Provider>;
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};
