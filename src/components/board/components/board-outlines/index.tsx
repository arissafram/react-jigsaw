import { BoardPathOptions, BoardSlot, SnappedPieceIds } from '@/types';
import { generateBoardPath } from '@/components/board/helpers/generate-board-path';

import styles from './styles.module.scss';

interface BoardOutlinesProps {
  boardPathOptions: BoardPathOptions;
  boardSlots: BoardSlot[];
  showBoardSlotOutlines: boolean | undefined;
  snappedPieceIds: SnappedPieceIds;
  dataTestId?: string;
}

const BoardOutlines = (props: BoardOutlinesProps) => {
  const { boardPathOptions, boardSlots, showBoardSlotOutlines, snappedPieceIds, dataTestId } =
    props;

  if (!showBoardSlotOutlines) return null;

  return (
    <g data-testid={dataTestId}>
      {boardSlots.map(({ pieceRow: row, pieceCol: col }) => {
        const boardSlotKey = `${row}-${col}`;
        const isSnapped = snappedPieceIds.has(boardSlotKey);

        return (
          <path
            key={`outline-${row}-${col}`}
            data-testid={`outline-${row}-${col}`}
            className={`${styles.boardSlotOutline} ${isSnapped ? styles.snapped : ''}`}
            d={generateBoardPath({ row, col, options: boardPathOptions })}
          />
        );
      })}
    </g>
  );
};

export default BoardOutlines;
