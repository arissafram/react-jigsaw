export interface JigsawPathOptions {
  width: number;
  height: number;
  rows: number;
  columns: number;
  tabSize?: number; // size of the jigsaw tab
  edgeMap: EdgeType[][];
}

// 0 = flat (border), 1 = outie, -1 = innie
export type EdgeType = [number, number, number, number]; // [top, right, bottom, left]

export function computeEdgeMap(rows: number, columns: number): EdgeType[][] {
  const edgeMap: EdgeType[][] = [];
  for (let row = 0; row < rows; row++) {
    edgeMap[row] = [];
    for (let col = 0; col < columns; col++) {
      let top = row === 0 ? 0 : -edgeMap[row - 1][col][2];
      let left = col === 0 ? 0 : -edgeMap[row][col - 1][1];
      let right = col === columns - 1 ? 0 : ((row + col) % 2 === 0 ? 1 : -1);
      let bottom = row === rows - 1 ? 0 : ((row - col) % 2 === 0 ? 1 : -1);
      edgeMap[row][col] = [top, right, bottom, left];
    }
  }
  return edgeMap;
}

/**
 * Generates an SVG path string for a jigsaw puzzle piece at (row, col).
 * Each tab/innie is a nearly circular Bézier, centered on the edge.
 */
export function generateJigsawPath(row: number, col: number, options: JigsawPathOptions): string {
  const { width, height, rows, columns, tabSize, edgeMap } = options;
  const pieceWidth = width / columns;
  const pieceHeight = height / rows;
  const x = col * pieceWidth;
  const y = row * pieceHeight;

  const [top, right, bottom, left] = edgeMap[row][col];

  // Tab shape params
  const tabW = pieceWidth / 4;
  const tabH = pieceHeight / 4;
  const tabR = Math.min(tabW, tabH); // radius for circular tab

  // Helper for a circular tab/innie (horizontal, centered)
  function tabHorz(dir: number) {
    // dir: 1 = outie, -1 = innie
    // Move to center, draw a circular tab, then back
    return [
      `h${(pieceWidth - tabW) / 2}`,
      // Circular tab using a single Bézier (approximate a half-circle)
      `c0,${-tabR * dir} ${tabW},${-tabR * dir} ${tabW},0`,
      `h${(pieceWidth - tabW) / 2}`
    ].join(' ');
  }
  // Helper for a circular tab/innie (vertical, centered)
  function tabVert(dir: number) {
    return [
      `v${(pieceHeight - tabH) / 2}`,
      `c${tabR * dir},0 ${tabR * dir},${tabH} 0,${tabH}`,
      `v${(pieceHeight - tabH) / 2}`
    ].join(' ');
  }

  let d = `M${x},${y}`;

  // Top edge
  if (top === 0) {
    d += ` h${pieceWidth}`;
  } else {
    d += tabHorz(top);
  }

  // Right edge
  if (right === 0) {
    d += ` v${pieceHeight}`;
  } else {
    d += tabVert(right);
  }

  // Bottom edge
  if (bottom === 0) {
    d += ` h-${pieceWidth}`;
  } else {
    d += tabHorz(-bottom);
  }

  // Left edge
  if (left === 0) {
    d += ` v-${pieceHeight}`;
  } else {
    d += tabVert(-left);
  }

  d += ' Z';
  return d;
}
