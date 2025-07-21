export interface JigsawPathOptions {
  width: number;
  height: number;
  rows: number;
  columns: number;
}

// Precompute edge types for the whole puzzle
export function computeEdgeMap(rows: number, columns: number): [number, number, number, number][][] {
  const edgeMap: [number, number, number, number][][] = [];
  for (let row = 0; row < rows; row++) {
    edgeMap[row] = [];
    for (let col = 0; col < columns; col++) {
      // Right and bottom: checkerboard pattern
      let right = col === columns - 1 ? 0 : ((row + col) % 2 === 0 ? 1 : -1);
      let bottom = row === rows - 1 ? 0 : ((row + col) % 2 === 0 ? 1 : -1);
      // Left: invert right of left neighbor
      let left = col === 0 ? 0 : -edgeMap[row][col - 1][1];
      // Top: invert bottom of top neighbor
      let top = row === 0 ? 0 : -edgeMap[row - 1][col][2];
      edgeMap[row][col] = [top, right, bottom, left];
    }
  }
  return edgeMap;
}

/**
 * Generates a rectangular SVG path string for a puzzle piece at (row, col),
 * with perfect semicircular half-circle knobs/innies (1/3 edge length) on non-border edges.
 * Edges alternate so adjoining pieces plug into each other.
 */
export function generateJigsawPath(row: number, col: number, options: JigsawPathOptions): string {
  const { width, height, rows, columns } = options;
  const pieceWidth = width / columns;
  const pieceHeight = height / rows;
  const x = col * pieceWidth;
  const y = row * pieceHeight;

  const edgeMap = computeEdgeMap(rows, columns);
  const [top, right, bottom, left] = edgeMap[row][col];
  const knobW = pieceWidth / 3;
  const knobH = pieceHeight / 3;
  const knobR = Math.min(knobW, knobH) / 2;

  let d = `M${x},${y}`;

  // Top edge
  if (top === 0) {
    d += ` h${pieceWidth}`;
  } else {
    d += ` h${(pieceWidth - knobW) / 2}`;
    d += ` a${knobW / 2},${knobR} 0 0 ${top === 1 ? 1 : 0} ${knobW},0`;
    d += ` h${(pieceWidth - knobW) / 2}`;
  }

  // Right edge
  if (right === 0) {
    d += ` v${pieceHeight}`;
  } else {
    d += ` v${(pieceHeight - knobH) / 2}`;
    d += ` a${knobR},${knobH / 2} 0 0 ${right === 1 ? 1 : 0} 0,${knobH}`;
    d += ` v${(pieceHeight - knobH) / 2}`;
  }

  // Bottom edge
  if (bottom === 0) {
    d += ` h-${pieceWidth}`;
  } else {
    d += ` h-${(pieceWidth - knobW) / 2}`;
    // Use negative x for arc, sweep-flag same as top
    d += ` a${knobW / 2},${knobR} 0 0 ${bottom === 1 ? 1 : 0} -${knobW},0`;
    d += ` h-${(pieceWidth - knobW) / 2}`;
  }

  // Left edge
  if (left === 0) {
    d += ` v-${pieceHeight}`;
  } else {
    d += ` v-${(pieceHeight - knobH) / 2}`;
    // Use negative y for arc, sweep-flag same as right
    d += ` a${knobR},${knobH / 2} 0 0 ${left === 1 ? 1 : 0} 0,-${knobH}`;
    d += ` v-${(pieceHeight - knobH) / 2}`;
  }

  d += ' Z';
  return d;
}
