import { generateJigsawPath, JigsawPathOptions } from './generateJigsawPath';

/**
 * Generates an array of SVG path strings (one for each piece) for use as clipPaths.
 */
export function generateClipPaths(options: JigsawPathOptions): string[] {
  const { rows, columns } = options;
  const paths: string[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      paths.push(generateJigsawPath(row, col, options));
    }
  }
  return paths;
}
