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
export const computeEdgeMap = ({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}): BoardPathOptions['edgeMap'] => {
  const edgeMap: BoardPathOptions['edgeMap'] = [];
  for (let row = 0; row < rows; row++) {
    edgeMap[row] = [];
    for (let col = 0; col < columns; col++) {
      // Right and bottom: checkerboard pattern
      const right = col === columns - 1 ? 0 : (row + col) % 2 === 0 ? 1 : -1;
      const bottom = row === rows - 1 ? 0 : (row + col) % 2 === 0 ? 1 : -1;
      // Left: invert right of left neighbor
      const left = col === 0 ? 0 : -edgeMap[row][col - 1][1];
      // Top: invert bottom of top neighbor
      const top = row === 0 ? 0 : -edgeMap[row - 1][col][2];
      edgeMap[row][col] = [top, right, bottom, left];
    }
  }
  return edgeMap;
};

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
export const generateBoardPath = ({
  col,
  row,
  options,
}: {
  col: number;
  row: number;
  options: BoardPathOptions;
}): string => {
  const { boardWidth, boardHeight, rows, columns, edgeMap } = options;
  const pieceWidth = boardWidth / columns;
  const pieceHeight = boardHeight / rows;
  const x = col * pieceWidth;
  const y = row * pieceHeight;

  // Use the precomputed edgeMap from options
  const [top, right, bottom, left] = edgeMap[row][col];
  const knobD = Math.min(pieceWidth, pieceHeight) / 3; // diameter of knob
  const knobR = knobD / 2;

  let d = `M${x},${y}`;

  // Top edge
  if (top === 0) {
    d += ` h${pieceWidth}`;
  } else {
    d += ` h${(pieceWidth - knobD) / 2}`;
    d += ` a${knobR},${knobR} 0 0 ${top === 1 ? 1 : 0} ${knobD},0`;
    d += ` h${(pieceWidth - knobD) / 2}`;
  }

  // Right edge
  if (right === 0) {
    d += ` v${pieceHeight}`;
  } else {
    d += ` v${(pieceHeight - knobD) / 2}`;
    d += ` a${knobR},${knobR} 0 0 ${right === 1 ? 1 : 0} 0,${knobD}`;
    d += ` v${(pieceHeight - knobD) / 2}`;
  }

  // Bottom edge
  if (bottom === 0) {
    d += ` h-${pieceWidth}`;
  } else {
    d += ` h-${(pieceWidth - knobD) / 2}`;
    d += ` a${knobR},${knobR} 0 0 ${bottom === 1 ? 1 : 0} -${knobD},0`;
    d += ` h-${(pieceWidth - knobD) / 2}`;
  }

  // Left edge
  if (left === 0) {
    d += ` v-${pieceHeight}`;
  } else {
    d += ` v-${(pieceHeight - knobD) / 2}`;
    d += ` a${knobR},${knobR} 0 0 ${left === 1 ? 1 : 0} 0,-${knobD}`;
    d += ` v-${(pieceHeight - knobD) / 2}`;
  }

  d += ' Z';
  return d;
};
