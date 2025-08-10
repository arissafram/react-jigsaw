import { jsx as _jsx } from "react/jsx-runtime";
import { generateBoardPath } from '@/components/board/helpers/generate-board-path';
import styles from './styles.module.scss';
const BoardOutlines = (props) => {
    const { boardPathOptions, boardSlots, showBoardSlotOutlines, snappedPieceIds } = props;
    if (!showBoardSlotOutlines)
        return null;
    return (_jsx("g", { "data-testid": "board-outlines", children: boardSlots.map(({ pieceRow: row, pieceCol: col }) => {
            const boardSlotKey = `${row}-${col}`;
            const isSnapped = snappedPieceIds.has(boardSlotKey);
            return (_jsx("path", { "data-testid": `outline-${row}-${col}`, className: `${styles.boardSlotOutline} ${isSnapped ? styles.snapped : ''}`, d: generateBoardPath({ row, col, options: boardPathOptions }), stroke: boardPathOptions.outlineStrokeColor }, `outline-${row}-${col}`));
        }) }));
};
export default BoardOutlines;
//# sourceMappingURL=index.js.map