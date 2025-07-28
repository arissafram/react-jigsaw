import { BoardSlot, PiecePosition } from '@/types';

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
 * @param rows - Number of rows in the grid
 * @param columns - Number of columns in the grid
 * @param boardSlots - The array of board slots to shuffle
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export const shufflePieces = ({
  boardWidth,
  boardHeight,
  rows,
  columns,
  boardSlots,
}: {
  boardWidth: number;
  boardHeight: number;
  rows: number;
  columns: number;
  boardSlots: BoardSlot[];
}): PiecePosition[] => {
  // Shuffle the board slots
  const shuffledBoardSlots = [...boardSlots];
  for (let i = shuffledBoardSlots.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledBoardSlots[i], shuffledBoardSlots[randomIndex]] = [
      shuffledBoardSlots[randomIndex],
      shuffledBoardSlots[i],
    ];
  }

  const pieceWidth = boardWidth / columns;
  const pieceHeight = boardHeight / rows;

  // Assign each piece a random position within the container area
  return shuffledBoardSlots.map(({ pieceRow, pieceCol }) => {
    // Calculate where we want the piece's right edge to appear
    const targetRightX = Math.random() * (boardWidth - 0);
    const targetY = Math.random() * (boardHeight - 0);

    // Calculate the piece's original board position (top-left corner)
    const originalX = pieceCol * pieceWidth;
    const originalY = pieceRow * pieceHeight;

    // Calculate the piece's original center X position
    const originalRightX = originalX + pieceWidth / 2;

    // Calculate the piece's original center Y position
    const originalCenterY = originalY + pieceHeight / 2;

    // Calculate the offset needed to move from original right edge to target right edge
    // and align by center of the height edge
    const x = targetRightX - originalRightX;
    const y = targetY - originalCenterY;

    return { pieceRow, pieceCol, x, y };
  });
};
