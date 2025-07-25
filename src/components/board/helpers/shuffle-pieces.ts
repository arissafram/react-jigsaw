import { BoardSlot, PiecePosition } from '@/types';

/**
 * Returns a new array with the elements shuffled in random order using the Fisher-Yates algorithm.
 * Used to randomize the order of board slots or other arrays without mutating the original.
 */
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

/**
 * Shuffles the board slots and assigns each piece a random initial position around the board.
 *
 * This is used to scatter puzzle pieces at the start of the game, so they don't start in their solved positions.
 * Each piece is given a random offset within a reasonable area around its slot.
 *
 * @param boardHeight - The height of the board
 * @param boardWidth - The width of the board
 * @param boardSlots - The array of board slots to shuffle
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export const shufflePieces = ({
  boardHeight,
  boardWidth,
  boardSlots,
}: {
  boardHeight: number;
  boardWidth: number;
  boardSlots: BoardSlot[];
}): PiecePosition[] => {
  // Shuffle the board slots
  const shuffledBoardSlots = getShuffledArray(boardSlots);

  // Assign each piece a random scatter position
  return shuffledBoardSlots.map(({ pieceRow, pieceCol }, i) => {
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
