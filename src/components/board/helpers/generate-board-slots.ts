import { BoardSlot } from '@/types';

// Generate all board slots in a single Array.from for better performance
export const generateBoardSlots = (rows: number, columns: number): BoardSlot[] => {
  return Array.from({ length: rows * columns }, (_, i) => ({
    // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
    // i % columns gives us the column number (0, 1, 2, ..., columns-1)
    pieceRow: Math.floor(i / columns),
    pieceCol: i % columns,
  }));
};
