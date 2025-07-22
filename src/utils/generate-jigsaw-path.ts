import { JigsawPathOptions } from '@/types';

// Precompute edge types for the whole puzzle
export const computeEdgeMap = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}): [number, number, number, number][][] => {
  const edgeMap: [number, number, number, number][][] = [];
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
 * Generates a rectangular SVG path string for a puzzle piece at (row, col),
 * with perfect semicircular half-circle knobs/innies (1/3 of the shorter side) on non-border edges.
 * Edges alternate so adjoining pieces plug into each other.
 */
export const generateJigsawPath = ({
  col,
  row,
  options,
}: {
  col: number;
  row: number;
  options: JigsawPathOptions;
}): string => {
  const { width, height, rows, columns } = options;
  const pieceWidth = width / columns;
  const pieceHeight = height / rows;
  const x = col * pieceWidth;
  const y = row * pieceHeight;

  const edgeMap = computeEdgeMap({ rows, columns });
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
