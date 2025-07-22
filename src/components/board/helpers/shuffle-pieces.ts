export interface PiecePosition {
  pieceRow: number;
  pieceCol: number;
  x: number;
  y: number;
}

export function shufflePieces(
  rows: number,
  columns: number,
  boardWidth: number,
  boardHeight: number,
  pieceWidth: number,
  pieceHeight: number,
): PiecePosition[] {
  // Create a list of all solved positions
  const solved: { pieceRow: number; pieceCol: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      solved.push({ pieceRow: row, pieceCol: col });
    }
  }
  // Shuffle the solved positions
  for (let i = solved.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [solved[i], solved[j]] = [solved[j], solved[i]];
  }
  // Assign each a random x/y
  return solved.map(({ pieceRow, pieceCol }) => {
    const x = Math.random() * (boardWidth - pieceWidth * 0.5) - pieceWidth * 0.25;
    const y = Math.random() * (boardHeight - pieceHeight * 0.5) - pieceHeight * 0.25;
    return { pieceRow, pieceCol, x, y };
  });
}
