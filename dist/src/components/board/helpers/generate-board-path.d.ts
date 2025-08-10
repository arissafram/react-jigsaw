import { BoardPathOptions } from '@/types';
/**
 * Computes the edge map for the entire puzzle board.
 *
 * An edge map defines the type of edge (flat, outie, or innie) for each side of every board slot in the puzzle grid.
 * Each slot has four edges: [top, right, bottom, left].
 *   - 0 = flat (border)
 *   - 1 = outie (protruding tab)
 *   - -1 = innie (indentation)
 *
 * The edge map ensures that adjacent pieces have matching edges (e.g., a right outie matches a left innie).
 * This is used to generate the correct SVG path for each puzzle piece so that all pieces fit together visually and physically.
 * The checkerboard pattern alternates outies and innies for a classic jigsaw look.
 *
 * Example for a 2x2 puzzle:
 *   edgeMap[0][0] = [0, 1, 1, 0]   // top-left piece: flat top/left, outie right/bottom
 *   edgeMap[0][1] = [0, 0, -1, -1] // top-right: flat top/right, innie bottom/left
 *   ...
 */
export declare const computeEdgeMap: ({ columns, rows, }: {
    columns: number;
    rows: number;
}) => BoardPathOptions["edgeMap"];
/**
 * Generates an SVG path string for a single puzzle piece at (row, col) on the board.
 *
 * The path describes the outline of the piece, including flat edges (for borders) and semicircular knobs (outies) or holes (innies) on non-border edges.
 * The size of each knob/innie is 1/3 of the shorter side of the piece, creating the classic jigsaw look.
 *
 * The function uses the edge map to determine the type of edge for each side:
 *   - 0 = flat (border)
 *   - 1 = outie (protruding tab)
 *   - -1 = innie (indentation)
 *
 * The edge map ensures that adjacent pieces have matching edges, so all pieces fit together visually and physically.
 * The resulting path can be used for rendering, clipping, or hit-testing the puzzle piece in SVG.
 *
 * Example: For a piece at (row, col), the path will have the correct combination of flat, outie, and innie edges based on its position and the edge map.
 */
export declare const generateBoardPath: ({ col, row, options, }: {
    col: number;
    row: number;
    options: BoardPathOptions;
}) => string;
//# sourceMappingURL=generate-board-path.d.ts.map