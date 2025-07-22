import { createContext, useContext, useState } from 'react';

// Define the shape of the puzzle context state
interface PuzzleContextState {
  numPieces: number;
  columns: number;
  rows: number;
  setColumns: (n: number) => void;
  setRows: (n: number) => void;
}

const PuzzleContext = createContext<PuzzleContextState | undefined>(undefined);

interface PuzzleProviderProps {
  children: React.ReactNode;
  columns: number;
  rows: number;
}

export const PuzzleProvider: React.FC<PuzzleProviderProps> = (props: PuzzleProviderProps) => {
  const { children, rows: initialRows, columns: initialColumns } = props;
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const numPieces = rows * columns;

  const value: PuzzleContextState = {
    columns,
    numPieces,
    rows,
    setRows,
    setColumns,
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
