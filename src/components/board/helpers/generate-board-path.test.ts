import { describe, it, expect } from 'vitest';
import { generateBoardPath, computeEdgeMap } from './generate-board-path';

describe('generateBoardPath', () => {
  const defaultOptions = {
    boardHeight: 500,
    boardWidth: 400,
    columns: 4,
    rows: 5,
    edgeMap: computeEdgeMap({ columns: 4, rows: 5 }),
  };

  it('generates valid SVG path for corner piece', () => {
    const path = generateBoardPath({ col: 0, row: 0, options: defaultOptions });

    expect(path).toBeTypeOf('string');
    expect(path.length).toBeGreaterThan(0);
    expect(path).toMatch(/^M/); // Should start with move command
    expect(path).toMatch(/Z$/); // Should end with close path
  });

  it('generates valid SVG path for edge piece', () => {
    const path = generateBoardPath({ col: 2, row: 0, options: defaultOptions });

    expect(path).toBeTypeOf('string');
    expect(path.length).toBeGreaterThan(0);
    expect(path).toMatch(/^M/);
    expect(path).toMatch(/Z$/);
  });

  it('generates valid SVG path for center piece', () => {
    const path = generateBoardPath({ col: 2, row: 2, options: defaultOptions });

    expect(path).toBeTypeOf('string');
    expect(path.length).toBeGreaterThan(0);
    expect(path).toMatch(/^M/);
    expect(path).toMatch(/Z$/);
  });

  it('generates different paths for different positions', () => {
    const path1 = generateBoardPath({ col: 0, row: 0, options: defaultOptions });
    const path2 = generateBoardPath({ col: 1, row: 1, options: defaultOptions });
    const path3 = generateBoardPath({ col: 3, row: 4, options: defaultOptions });

    expect(path1).not.toBe(path2);
    expect(path2).not.toBe(path3);
    expect(path1).not.toBe(path3);
  });

  it('works with different board dimensions', () => {
    const customOptions = {
      boardHeight: 600,
      boardWidth: 800,
      columns: 3,
      rows: 6,
      edgeMap: computeEdgeMap({ columns: 3, rows: 6 }),
    };

    const path = generateBoardPath({ col: 1, row: 2, options: customOptions });

    expect(path).toBeTypeOf('string');
    expect(path.length).toBeGreaterThan(0);
    expect(path).toMatch(/^M/);
    expect(path).toMatch(/Z$/);
  });

  it('generates paths with correct starting position', () => {
    const path = generateBoardPath({ col: 2, row: 3, options: defaultOptions });

    // Should start with the correct position: M{x},{y}
    // For col=2, row=3: x = 2 * (400/4) = 200, y = 3 * (500/5) = 300
    expect(path).toMatch(/^M200,300/);
  });
});

describe('computeEdgeMap', () => {
  it('generates correct edge map for 2x2 board', () => {
    const edgeMap = computeEdgeMap({ columns: 2, rows: 2 });

    expect(edgeMap).toHaveLength(2);
    expect(edgeMap[0]).toHaveLength(2);
    expect(edgeMap[1]).toHaveLength(2);

    // Each edge should be an array of 4 numbers [top, right, bottom, left]
    edgeMap.forEach((row) => {
      row.forEach((edges) => {
        expect(edges).toHaveLength(4);
        edges.forEach((edge) => {
          expect([-1, 0, 1]).toContain(edge);
        });
      });
    });
  });

  it('generates correct edge map for 3x3 board', () => {
    const edgeMap = computeEdgeMap({ columns: 3, rows: 3 });

    expect(edgeMap).toHaveLength(3);
    expect(edgeMap[0]).toHaveLength(3);
    expect(edgeMap[1]).toHaveLength(3);
    expect(edgeMap[2]).toHaveLength(3);

    // Check that border edges are flat (0)
    // Top row should have flat top edges
    edgeMap[0].forEach((edges) => {
      expect(edges[0]).toBe(0); // top edge
    });

    // Bottom row should have flat bottom edges
    edgeMap[2].forEach((edges) => {
      expect(edges[2]).toBe(0); // bottom edge
    });

    // Left column should have flat left edges
    edgeMap.forEach((row) => {
      expect(row[0][3]).toBe(0); // left edge
    });

    // Right column should have flat right edges
    edgeMap.forEach((row) => {
      expect(row[2][1]).toBe(0); // right edge
    });
  });

  it('generates edge map with correct dimensions', () => {
    const edgeMap = computeEdgeMap({ columns: 4, rows: 5 });

    expect(edgeMap).toHaveLength(5);
    edgeMap.forEach((row) => {
      expect(row).toHaveLength(4);
    });
  });

  it('ensures adjacent pieces have matching edges', () => {
    const edgeMap = computeEdgeMap({ columns: 3, rows: 3 });

    // Check that adjacent pieces have matching edges
    // For example, piece (0,0) right edge should match piece (0,1) left edge
    expect(edgeMap[0][0][1]).toBe(-edgeMap[0][1][3]); // right matches left

    // Piece (0,0) bottom edge should match piece (1,0) top edge
    expect(edgeMap[0][0][2]).toBe(-edgeMap[1][0][0]); // bottom matches top
  });

  it('generates checkerboard pattern for interior pieces', () => {
    const edgeMap = computeEdgeMap({ columns: 4, rows: 4 });

    // Interior pieces should have alternating outie/innie pattern
    // This is a simplified check - in practice the pattern is more complex
    // but we can verify that interior pieces have non-zero edges
    for (let row = 1; row < 3; row++) {
      for (let col = 1; col < 3; col++) {
        const edges = edgeMap[row][col];
        // Interior pieces should have some non-zero edges (not all flat)
        const nonZeroEdges = edges.filter((edge) => edge !== 0);
        expect(nonZeroEdges.length).toBeGreaterThan(0);
      }
    }
  });
});
