import { JigsawPathOptions } from '@/types';
import { generateJigsawPath } from '@/utils/generate-jigsaw-path';

import styles from './styles.module.scss';

interface GridOutlinesProps {
  jigawOptions: JigsawPathOptions;
  positions: Array<{ pieceRow: number; pieceCol: number }>;
  showGridOutlines: boolean | undefined;
  snappedPieces: Set<string>;
}

const GridOutlines = (props: GridOutlinesProps) => {
  const { jigawOptions, positions, showGridOutlines, snappedPieces } = props;

  if (!showGridOutlines) return null;

  return positions.map(({ pieceRow: row, pieceCol: col }) => {
    const gridKey = `${row}-${col}`;
    const isSnapped = snappedPieces.has(gridKey);

    return (
      <path
        key={`outline-${row}-${col}`}
        className={`${styles.gridOutline} ${isSnapped ? styles.snapped : ''}`}
        d={generateJigsawPath({ row, col, options: jigawOptions })}
      />
    );
  });
};

export default GridOutlines;
