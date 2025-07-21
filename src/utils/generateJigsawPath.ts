export interface JigsawPathOptions {
  width: number;
  height: number;
  rows: number;
  columns: number;
  tabSize?: number; // size of the jigsaw tab
}

// Helper to get edge type for each piece
// 0 = flat (border), 1 = outie, -1 = innie
function getEdgeTypes(row: number, col: number, rows: number, columns: number): [number, number, number, number] {
  let top = row === 0 ? 0 : undefined;
  let left = col === 0 ? 0 : undefined;
  let bottom = row === rows - 1 ? 0 : undefined;
  let right = col === columns - 1 ? 0 : undefined;
  if (top === undefined) top = -getEdgeTypes(row - 1, col, rows, columns)[2];
  if (left === undefined) left = -getEdgeTypes(row, col - 1, rows, columns)[1];
  if (right === undefined) right = ((row + col) % 2 === 0 ? 1 : -1);
  if (bottom === undefined) bottom = ((row - col) % 2 === 0 ? 1 : -1);
  return [top, right, bottom, left];
}

/**
 * Generates an SVG path string for a jigsaw puzzle piece at (row, col).
 * Each tab/innie is a single smooth bump (fewer control points, less pronounced).
 */
export function generateJigsawPath(row: number, col: number, options: JigsawPathOptions): string {
  const { width, height, rows, columns, tabSize = 16 } = options;
  const pieceWidth = width / columns;
  const pieceHeight = height / rows;
  const x = col * pieceWidth;
  const y = row * pieceHeight;

  // Get edge types: [top, right, bottom, left]
  const [top, right, bottom, left] = getEdgeTypes(row, col, rows, columns);

  // Tab shape params
  const tabWidth = pieceWidth / 3;
  const tabHeight = tabSize;

  // Helper for a single tab/innie (horizontal)
  function tabH(dir: number) {
    // dir: 1 = outie, -1 = innie
    return `c${tabWidth / 2},${-tabHeight * dir} ${tabWidth / 2},${-tabHeight * dir} ${tabWidth},0`;
  }
  // Helper for a single tab/innie (vertical)
  function tabV(dir: number) {
    return `c${tabHeight * dir},${tabWidth / 2} ${tabHeight * dir},${tabWidth / 2} 0,${tabWidth}`;
  }

  // Start at top-left
  let d = `M${x},${y}`;

  // Top edge
  if (top === 0) {
    d += ` h${pieceWidth}`;
  } else {
    d += ` h${tabWidth}`;
    d += ' ' + tabH(top);
    d += ` h${pieceWidth - 2 * tabWidth}`;
  }

  // Right edge
  if (right === 0) {
    d += ` v${pieceHeight}`;
  } else {
    d += ` v${tabWidth}`;
    d += ' ' + tabV(right);
    d += ` v${pieceHeight - 2 * tabWidth}`;
  }

  // Bottom edge
  if (bottom === 0) {
    d += ` h-${pieceWidth}`;
  } else {
    d += ` h-${-tabWidth}`;
    d += ' ' + tabH(-bottom);
    d += ` h-${pieceWidth - 2 * tabWidth}`;
  }

  // Left edge
  if (left === 0) {
    d += ` v-${pieceHeight}`;
  } else {
    d += ` v-${-tabWidth}`;
    d += ' ' + tabV(-left);
    d += ` v-${pieceHeight - 2 * tabWidth}`;
  }

  d += ' Z';
  return d;
}
