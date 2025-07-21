import React, { createContext, useContext, useState } from 'react';

// Define the shape of the puzzle context state
interface PuzzleContextState {
  numPieces: number;
  setNumPieces: (n: number) => void;
}

const PuzzleContext = createContext<PuzzleContextState | undefined>(undefined);

interface PuzzleProviderProps {
  children: React.ReactNode;
}

export const PuzzleProvider: React.FC<PuzzleProviderProps> = (props: PuzzleProviderProps) => {
  const { children } = props;
  const [numPieces, setNumPieces] = useState(4);

  const value: PuzzleContextState = {
    numPieces,
    setNumPieces,
  };

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
}; 