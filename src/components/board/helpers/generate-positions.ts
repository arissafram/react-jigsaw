// Generate all grid positions in a single Array.from for better performance
export const generatePositions = (rows: number, columns: number) => {
  return Array.from({ length: rows * columns }, (_, i) => ({
    pieceRow: Math.floor(i / columns),
    pieceCol: i % columns,
  }));
};
