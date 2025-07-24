import { GridSlot, JigsawPathOptions, SnappedPieceIds } from '@/types';
import { generateJigsawPath } from '@/utils/generate-jigsaw-path';

import styles from './styles.module.scss';

interface GridOutlinesProps {
  jigsawOptions: JigsawPathOptions;
  gridSlots: GridSlot[];
  showGridOutlines: boolean | undefined;
  snappedPieceIds: SnappedPieceIds;
}

const GridOutlines = (props: GridOutlinesProps) => {
  const { jigsawOptions, gridSlots, showGridOutlines, snappedPieceIds } = props;

  if (!showGridOutlines) return null;

  return gridSlots.map(({ pieceRow: row, pieceCol: col }) => {
    const gridKey = `${row}-${col}`;
    const isSnapped = snappedPieceIds.has(gridKey);

    return (
      <path
        key={`outline-${row}-${col}`}
        className={`${styles.gridOutline} ${isSnapped ? styles.snapped : ''}`}
        d={generateJigsawPath({ row, col, options: jigsawOptions })}
      />
    );
  });
};

export default GridOutlines;
