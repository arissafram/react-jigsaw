import { FC } from 'react';
import { PuzzleOptions } from '@/types';
interface BoardProps {
    boardHeight: number;
    boardWidth: number;
    className: string;
    columns: number;
    image: string;
    onPuzzleComplete?: () => void;
    puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
    rows: number;
    showBoardSlotOutlines: boolean;
    snapThreshold: number;
    scatterArea: number;
}
declare const Board: FC<BoardProps>;
export default Board;
//# sourceMappingURL=index.d.ts.map