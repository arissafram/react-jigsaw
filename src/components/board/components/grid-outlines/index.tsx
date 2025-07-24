import { JigsawPathOptions } from '@/types';
import { generateJigsawPath } from '@/utils/generate-jigsaw-path';

import styles from './styles.module.scss';

interface GridOutlinesProps {
  columns: number;
  jigawOptions: JigsawPathOptions;
  rows: number;
  showGridOutlines: boolean | undefined;
  snappedPieces: Set<string>;
}

const GridOutlines = (props: GridOutlinesProps) => {
  const { columns, jigawOptions, rows, showGridOutlines, snappedPieces } = props;

  if (!showGridOutlines) return null;

  return Array.from({ length: rows }).map((_, row) =>
    Array.from({ length: columns }).map((_, col) => {
      const gridKey = `${row}-${col}`;
      const isSnapped = snappedPieces.has(gridKey);

      return (
        <path
          key={`outline-${row}-${col}`}
          className={`${styles.gridOutline} ${isSnapped ? styles.snapped : ''}`}
          d={generateJigsawPath({ row, col, options: jigawOptions })}
        />
      );
    }),
  );
};

export default GridOutlines;
