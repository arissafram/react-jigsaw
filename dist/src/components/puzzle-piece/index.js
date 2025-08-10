import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { STROKE_WIDTH } from '@/constants';
import { useMovePieces } from '@/hooks/use-move-pieces';
import styles from './styles.module.scss';
const STEP_SIZE = 10;
const PuzzlePiece = ({ boardHeight, boardWidth, image, pieceIndex, initialX, initialY, path, snapThreshold, boardRef, targetX, targetY, puzzlePieceOptions, onSnap, onSnapWithKeyboard, registerPieceRef, boardSlotKey, onDragStart, onDragEnd, }) => {
    const { ref, dragState, isSnapped, moveBy, trySnap, handlers } = useMovePieces({
        initialX,
        initialY,
        snapThreshold,
        boardRef,
        targetX,
        targetY,
        onSnap,
        onDragStart,
        onDragEnd,
    });
    // Register this piece's ref with the parent
    useEffect(() => {
        if (registerPieceRef) {
            registerPieceRef(boardSlotKey, ref.current);
        }
        return () => {
            if (registerPieceRef) {
                registerPieceRef(boardSlotKey, null);
            }
        };
    }, [ref, registerPieceRef, boardSlotKey]);
    const handleKeyDown = (e) => {
        if (isSnapped)
            return;
        const step = STEP_SIZE; // 10px movement per key press
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                moveBy(0, -step);
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveBy(0, step);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                moveBy(-step, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveBy(step, 0);
                break;
            case 'Enter':
            case ' ': {
                e.preventDefault();
                const snapSuccess = trySnap();
                // Only call the keyboard-specific callback if snap was successful
                if (snapSuccess && onSnapWithKeyboard) {
                    onSnapWithKeyboard();
                }
                break;
            }
        }
    };
    // Bring element to front when dragging starts
    useEffect(() => {
        if (dragState.isDragging && ref.current && ref.current.parentNode && !isSnapped) {
            ref.current.parentNode.appendChild(ref.current);
        }
    }, [ref, dragState.isDragging, isSnapped]);
    // Move element to back when snapped and drag ends
    useEffect(() => {
        if (!dragState.isDragging && isSnapped && ref.current && ref.current.parentNode) {
            const parent = ref.current.parentNode;
            if (parent.firstChild !== ref.current) {
                parent.insertBefore(ref.current, parent.firstChild);
            }
        }
    }, [ref, dragState.isDragging, isSnapped]);
    return (_jsxs("g", { ref: ref, transform: isSnapped ? '' : `translate(${dragState.x},${dragState.y})`, ...handlers, className: styles.puzzlePiece, tabIndex: isSnapped ? -1 : 0, onKeyDown: handleKeyDown, children: [_jsx("defs", { children: _jsx("clipPath", { id: `piece-clip-${pieceIndex}`, children: _jsx("path", { d: path }) }) }), _jsx("image", { href: image, x: 0, y: 0, width: boardWidth, height: boardHeight, clipPath: `url(#piece-clip-${pieceIndex})`, preserveAspectRatio: "xMidYMid slice" }), _jsx("path", { d: path, fill: "none", stroke: isSnapped || !puzzlePieceOptions.strokeEnabled ? '' : puzzlePieceOptions.strokeColor, strokeWidth: puzzlePieceOptions.strokeEnabled ? STROKE_WIDTH : 0 })] }));
};
export default PuzzlePiece;
//# sourceMappingURL=index.js.map