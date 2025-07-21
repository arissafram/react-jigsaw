import React, { createContext, useContext, useState } from 'react';

// Define the shape of the puzzle context state
interface PuzzleContextState {
  numPieces: number;
  rows: number;
  columns: number;
  setRows: (n: number) => void;
  setColumns: (n: number) => void;
}

const PuzzleContext = createContext<PuzzleContextState | undefined>(undefined);

interface PuzzleProviderProps {
  children: React.ReactNode;
  rows: number;
  columns: number;
}

export const PuzzleProvider: React.FC<PuzzleProviderProps> = (props: PuzzleProviderProps) => {
  const { children, rows: initialRows, columns: initialColumns } = props;
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const numPieces = rows * columns;

  const value: PuzzleContextState = {
    numPieces,
    rows,
    columns,
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
