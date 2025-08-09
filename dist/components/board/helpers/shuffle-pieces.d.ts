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
 * @param pieceHeight - The height of a piece
 * @param pieceWidth - The width of a piece
 * @param boardSlots - The array of board slots to shuffle
 * @param scatterArea - Defines the expansion of the scattering area in all directions (default: 0)
 * @returns An array of PiecePosition objects with randomized x/y positions
 */
export declare const shufflePieces: ({ boardWidth, boardHeight, boardSlots, pieceHeight, pieceWidth, scatterArea, }: {
    boardWidth: number;
    boardHeight: number;
    boardSlots: BoardSlot[];
    pieceHeight: number;
    pieceWidth: number;
    scatterArea: number;
}) => PiecePosition[];
//# sourceMappingURL=shuffle-pieces.d.ts.map