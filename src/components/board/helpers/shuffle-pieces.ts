import { BoardSlot, PiecePosition } from '@/types';

/**
 * Shuffles the board slots and assigns each piece a random initial position within the container area.
 *
 * Pieces are placed randomly within the container boundaries, staying 50px away from the container border
 * to ensure they don't scatter outside the visible area. The positions account for the board's
 * actual position within the container and the fact that each piece's path is already positioned at
 * its board coordinates.
 *
 * @param containerWidth - The width of the container area
 * @param containerHeight - The height of the container area
 * @param rows - Number of rows in the grid
 * @param columns - Number of columns in the grid
 * @param boardSlots - The array of board slots to shuffle
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export const shufflePieces = ({
  containerWidth,
  containerHeight,
  rows,
  columns,
  boardSlots,
}: {
  containerWidth: number;
  containerHeight: number;
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

  // Calculate the safe area for piece placement (50px from container borders)
  const minX = 0;
  const maxX = containerWidth;
  const minY = 0;
  const maxY = containerHeight;

  // Calculate piece dimensions based on actual grid size
  const boardWidth = (maxX - minX) * 0.8; // Use 80% of container width for board
  const boardHeight = (maxY - minY) * 0.8; // Use 80% of container height for board
  const pieceWidth = boardWidth / columns;
  const pieceHeight = boardHeight / rows;

  // Assign each piece a random position within the container area
  return shuffledBoardSlots.map(({ pieceRow, pieceCol }) => {
    // Calculate where we want the piece's right edge to appear
    const targetRightX = Math.random() * (maxX - minX) + minX;
    const targetY = Math.random() * (maxY - minY) + minY;

    // Calculate the piece's original board position (top-left corner)
    const originalX = pieceCol * pieceWidth;
    const originalY = pieceRow * pieceHeight;

    // Calculate the piece's original right edge position
    const originalRightX = originalX + pieceWidth;

    // Calculate the piece's original center Y position
    const originalCenterY = originalY + pieceHeight / 2;

    // Calculate the offset needed to move from original right edge to target right edge
    // and align by center of the height edge
    const x = targetRightX - originalRightX;
    const y = targetY - originalCenterY;

    return { pieceRow, pieceCol, x, y };
  });
};
