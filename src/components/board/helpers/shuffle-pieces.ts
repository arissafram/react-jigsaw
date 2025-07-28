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
 * @param scatterAreaExpansion - Optional expansion of the scattering area in all directions (default: 0)
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export const shufflePieces = ({
  boardWidth,
  boardHeight,
  rows,
  columns,
  boardSlots,
  scatterAreaExpansion = 0,
}: {
  boardWidth: number;
  boardHeight: number;
  rows: number;
  columns: number;
  boardSlots: BoardSlot[];
  scatterAreaExpansion?: number;
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

  // Calculate the expanded scattering area
  const expandedWidth = boardWidth + scatterAreaExpansion * 2;
  const expandedHeight = boardHeight + scatterAreaExpansion * 2;

  // Calculate the offset to keep pieces centered in the expanded area
  const offsetX = -scatterAreaExpansion;
  const offsetY = -scatterAreaExpansion;

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
