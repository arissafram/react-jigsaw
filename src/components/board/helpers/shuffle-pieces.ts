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
  columns,
  height,
  width,
  rows,
}: {
  columns: number;
  height: number;
  width: number;
  rows: number;
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
  return shuffledPositions.map(({ pieceRow, pieceCol }, i) => {
    const pieceHeight = i % 2 !== 0 ? -height : height;
    const pieceWidth = i % 2 !== 0 ? -width : width;

    const x = Math.random() * pieceWidth;
    const y = Math.random() * pieceHeight;

    return { pieceRow, pieceCol, x, y };
  });
};
