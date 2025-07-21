export interface PiecePosition {
  row: number;
  col: number;
  x: number;
  y: number;
}

export function scramblePieces(rows: number, columns: number, boardWidth: number, boardHeight: number, pieceWidth: number, pieceHeight: number): PiecePosition[] {
  const positions: PiecePosition[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      // Random x/y within or just outside the board
      const x = Math.random() * (boardWidth - pieceWidth * 0.5) - pieceWidth * 0.25;
      const y = Math.random() * (boardHeight - pieceHeight * 0.5) - pieceHeight * 0.25;
      positions.push({ row, col, x, y });
    }
  }
  // Shuffle the array for extra randomness
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return positions;
} 