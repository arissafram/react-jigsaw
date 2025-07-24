import { GridSlot } from '@/types';

// Generate all grid slots in a single Array.from for better performance
export const generateGridSlots = (rows: number, columns: number): GridSlot[] => {
  return Array.from({ length: rows * columns }, (_, i) => ({
    // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
    // i % columns gives us the column number (0, 1, 2, ..., columns-1)
    pieceRow: Math.floor(i / columns),
    pieceCol: i % columns,
  }));
};
