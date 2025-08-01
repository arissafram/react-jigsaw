import { BoardSlot } from '@/types';
/**
 * Generates an array of all possible board slots (row/column positions) for a puzzle board.
 *
 * Each slot represents a unique position where a puzzle piece can be placed or snapped.
 * The result is used for board layout, shuffling, and piece placement logic.
 *
 * @param rows - Number of rows in the board
 * @param columns - Number of columns in the board
 * @returns An array of BoardSlot objects, one for each slot on the board
 */
export declare const generateBoardSlots: (rows: number, columns: number) => BoardSlot[];
//# sourceMappingURL=generate-board-slots.d.ts.map