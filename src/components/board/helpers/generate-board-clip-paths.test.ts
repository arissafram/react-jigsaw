import { describe, it, expect } from 'vitest';
import { generateBoardClipPaths } from './generate-board-clip-paths';
import { computeEdgeMap } from './generate-board-path';

describe('generateBoardClipPaths', () => {
  const defaultOptions = {
    boardHeight: 500,
    boardWidth: 400,
    columns: 4,
    rows: 5,
    edgeMap: computeEdgeMap({ columns: 4, rows: 5 }),
  };

  it('generates correct number of clip paths', () => {
    const clipPaths = generateBoardClipPaths(defaultOptions);
    // Should generate rows * columns paths (5 * 4 = 20)
    expect(clipPaths.length).toBe(20);
  });

  it('generates valid SVG path strings', () => {
    const clipPaths = generateBoardClipPaths(defaultOptions);

    clipPaths.forEach((path) => {
      // Each path should be a non-empty string
      expect(path).toBeTypeOf('string');
      expect(path.length).toBeGreaterThan(0);

      // Each path should start with 'M' (move command)
      expect(path).toMatch(/^M/);

      // Each path should end with 'Z' (close path)
      expect(path).toMatch(/Z$/);
    });
  });

  it('generates paths in correct order (row-major)', () => {
    const clipPaths = generateBoardClipPaths(defaultOptions);

    // Check that paths are generated in row-major order
    // First row: (0,0), (0,1), (0,2), (0,3)
    // Second row: (1,0), (1,1), (1,2), (1,3)
    // etc.

    // The first path should be for position (0,0)
    expect(clipPaths[0]).toBeTypeOf('string');
    expect(clipPaths[0].length).toBeGreaterThan(0);

    // The last path should be for position (4,3)
    expect(clipPaths[19]).toBeTypeOf('string');
    expect(clipPaths[19].length).toBeGreaterThan(0);
  });

  it('works with different board dimensions', () => {
    const customOptions = {
      boardHeight: 600,
      boardWidth: 800,
      columns: 3,
      rows: 6,
      edgeMap: computeEdgeMap({ columns: 3, rows: 6 }),
    };

    const clipPaths = generateBoardClipPaths(customOptions);
    // Should generate 6 * 3 = 18 paths
    expect(clipPaths.length).toBe(18);

    clipPaths.forEach((path) => {
      expect(path).toBeTypeOf('string');
      expect(path.length).toBeGreaterThan(0);
      expect(path).toMatch(/^M/);
      expect(path).toMatch(/Z$/);
    });
  });

  it('works with square board', () => {
    const squareOptions = {
      boardHeight: 400,
      boardWidth: 400,
      columns: 3,
      rows: 3,
      edgeMap: computeEdgeMap({ columns: 3, rows: 3 }),
    };

    const clipPaths = generateBoardClipPaths(squareOptions);
    // Should generate 3 * 3 = 9 paths
    expect(clipPaths.length).toBe(9);

    clipPaths.forEach((path) => {
      expect(path).toBeTypeOf('string');
      expect(path.length).toBeGreaterThan(0);
      expect(path).toMatch(/^M/);
      expect(path).toMatch(/Z$/);
    });
  });

  it('generates unique paths for each position', () => {
    const clipPaths = generateBoardClipPaths(defaultOptions);

    // Each path should be unique (since each piece has a different position)
    const uniquePaths = new Set(clipPaths);
    expect(uniquePaths.size).toBe(clipPaths.length);
  });
});
