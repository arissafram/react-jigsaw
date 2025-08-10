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
export const generateBoardSlots = (rows, columns) => {
    return Array.from({ length: rows * columns }, (_, i) => ({
        // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
        // i % columns gives us the column number (0, 1, 2, ..., columns-1)
        pieceRow: Math.floor(i / columns),
        pieceCol: i % columns,
    }));
};
//# sourceMappingURL=generate-board-slots.js.map