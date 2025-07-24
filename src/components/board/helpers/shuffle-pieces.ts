import { PiecePosition } from '@/types';

// Fisher-Yates shuffle algorithm - returns a new shuffled array
const getShuffledArray = <T>(array: T[]): T[] => {
  // Create a copy to avoid mutating the original array
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap current item with random item
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

export const shufflePieces = ({
  boardHeight,
  boardWidth,
  columns,
  pieceHeight,
  pieceWidth,
  rows,
  shuffleArea = 'board',
}: {
  boardHeight: number;
  boardWidth: number;
  columns: number;
  pieceHeight: number;
  pieceWidth: number;
  rows: number;
  shuffleArea?: 'anywhere' | 'board';
}): PiecePosition[] => {
  // Create a list of all positions. Array.from as opposed to double loops
  // because it's faster than nested loops and pre-allocates memory
  const positions = Array.from({ length: rows * columns }, (_, i) => ({
    pieceRow: Math.floor(i / columns),
    pieceCol: i % columns,
  }));

  // Shuffle the positions
  const shuffledPositions = getShuffledArray(positions);

  // Assign each a random x/y
  return shuffledPositions.map(({ pieceRow, pieceCol }) => {
    let x, y;
    if (shuffleArea === 'board') {
      x = Math.random() * pieceWidth;
      y = Math.random() * pieceHeight;
    } else {
      x = Math.random() * (boardWidth - pieceWidth * 0.5) - pieceWidth * 0.25;
      y = Math.random() * (boardHeight - pieceHeight * 0.5) - pieceHeight * 0.25;
    }
    return { pieceRow, pieceCol, x, y };
  });
};
