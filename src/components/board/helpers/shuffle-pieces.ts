import { BoardSlot, PiecePosition } from '@/types';

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * This is an unbiased shuffle where each permutation has equal probability.
 *
 * @param array - The array to shuffle
 * @returns A new shuffled array (original array is not modified)
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
 * Shuffles the board slots and assigns each piece a random initial position within the container area.
 *
 * Pieces are placed randomly within the container boundaries, staying 50px away from the container border
 * to ensure they don't scatter outside the visible area. The positions account for the board's
 * actual position within the container and the fact that each piece's path is already positioned at
 * its board coordinates.
 *
 * @param boardWidth - The width of the container area
 * @param boardHeight - The height of the container area
 * @param pieceHeight - The height of a piece
 * @param pieceWidth - The width of a piece
 * @param boardSlots - The array of board slots to shuffle
 * @param scatterArea - Defines the expansion of the scattering area in all directions (default: 0)
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export const shufflePieces = ({
  boardWidth,
  boardHeight,
  boardSlots,
  pieceHeight,
  pieceWidth,
  scatterArea,
}: {
  boardWidth: number;
  boardHeight: number;
  boardSlots: BoardSlot[];
  pieceHeight: number;
  pieceWidth: number;
  scatterArea: number;
}): PiecePosition[] => {
  // Shuffle the board slots
  const shuffledBoardSlots = getShuffledArray(boardSlots);

  // Calculate the expanded scattering area
  const expandedWidth = boardWidth + scatterArea * 2;
  const expandedHeight = boardHeight + scatterArea * 2;

  // Calculate the offset to keep pieces centered in the expanded area
  const offsetX = -scatterArea;
  const offsetY = -scatterArea;

  // Assign each piece a random position within the expanded container area
  return shuffledBoardSlots.map(({ pieceRow, pieceCol }) => {
    // Calculate where we want the piece to appear in the shuffled area
    // Use the expanded dimensions but account for piece size to keep pieces fully visible
    const shuffledX = offsetX + Math.random() * (expandedWidth - pieceWidth);
    const shuffledY = offsetY + Math.random() * (expandedHeight - pieceHeight);

    // Calculate the piece's original board position (where the path is defined)
    const originalBoardX = pieceCol * pieceWidth;
    const originalBoardY = pieceRow * pieceHeight;

    // Calculate the offset needed to move from original board position to shuffled position
    // This is necessaary because each piece path sits inside of a larger container equal
    // to the size of the board.
    const x = shuffledX - originalBoardX;
    const y = shuffledY - originalBoardY;

    return { pieceRow, pieceCol, x, y };
  });
};
