import { BoardPathOptions } from '@/types';

import { generateBoardPath } from './generate-board-path';

/**
 * Generates an array of SVG path strings (one for each piece) for use as clipPaths.
 * Requires a precomputed edgeMap for correct edge matching.
 */
export const generateBoardClipPaths = (options: BoardPathOptions): string[] => {
  const { rows, columns } = options;
  const paths: string[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      paths.push(generateBoardPath({ row, col, options }));
    }
  }
  return paths;
};
