import { FC } from 'react';
import { PuzzleOptions, BoardRef } from '@/types';
interface PuzzlePieceProps {
    boardHeight: number;
    boardWidth: number;
    image: string;
    pieceIndex: number;
    initialX: number;
    initialY: number;
    path: string;
    snapThreshold: number;
    boardRef: BoardRef;
    targetX: number;
    targetY: number;
    puzzlePieceOptions: PuzzleOptions['puzzlePiece'];
    onSnap?: () => void;
    onSnapWithKeyboard?: () => void;
    registerPieceRef?: (boardSlotKey: string, ref: SVGGElement | null) => void;
    boardSlotKey: string;
}
declare const PuzzlePiece: FC<PuzzlePieceProps>;
export default PuzzlePiece;
//# sourceMappingURL=index.d.ts.map