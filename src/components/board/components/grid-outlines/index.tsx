import { JigsawPathOptions } from '@/types';
import { generateJigsawPath } from '@/utils/generate-jigsaw-path';

import styles from './styles.module.scss';

interface GridOutlinesProps {
  jigawOptions: JigsawPathOptions;
  gridSlots: Array<{ pieceRow: number; pieceCol: number }>;
  showGridOutlines: boolean | undefined;
  snappedPieceIds: Set<string>;
}

const GridOutlines = (props: GridOutlinesProps) => {
  const { jigawOptions, gridSlots, showGridOutlines, snappedPieceIds } = props;

  if (!showGridOutlines) return null;

  return gridSlots.map(({ pieceRow: row, pieceCol: col }) => {
    const gridKey = `${row}-${col}`;
    const isSnapped = snappedPieceIds.has(gridKey);

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
