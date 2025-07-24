import { GridSlot, PiecePosition } from '@/types';

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
  positions,
}: {
  boardHeight: number;
  boardWidth: number;
  positions: GridSlot[];
}): PiecePosition[] => {
  // Shuffle the positions
  const shuffledPositions = getShuffledArray(positions);

  // Assign each piece a random scatter position
  return shuffledPositions.map(({ pieceRow, pieceCol }, i) => {
    // Alternate between positive and negative dimensions
    const pieceHeight = i % 2 !== 0 ? -boardHeight : boardHeight;
    const pieceWidth = i % 2 !== 0 ? -boardWidth : boardWidth;

    // Create random offset: Math.random() - 0.5 gives range -0.5 to +0.5
    // Multiply by half the piece size to scatter within area
    const x = (Math.random() - 0.5) * pieceWidth * 0.5;
    const y = (Math.random() - 0.5) * pieceHeight * 0.5;

    return { pieceRow, pieceCol, x, y };
  });
};
