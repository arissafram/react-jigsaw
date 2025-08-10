import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Board from '@/components/board';
import EditRowsColumns from '@/components/edit-rows-columns';
import RefreshButton from '@/components/refresh-button';
import Timer from '@/components/timer';
import { usePuzzleContext } from '@/contexts/puzzle-context';
import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
const PuzzleContent = (props) => {
    const { image, onComplete, onRefresh, options } = props;
    const { columns, refreshBoard, refreshCount, rows, setBoardGrid, setTimerIsRunning, timerIsRunning, } = usePuzzleContext();
    const [isAnyPieceActive, setIsAnyPieceActive] = useState(false);
    useEffect(() => {
        if (!isAnyPieceActive)
            return;
        const preventTouchMove = (e) => {
            e.preventDefault();
        };
        const preventGesture = (e) => {
            e.preventDefault();
        };
        window.addEventListener('touchmove', preventTouchMove, { passive: false });
        // Safari-specific gesture zoom prevention
        window.addEventListener('gesturestart', preventGesture, { passive: false });
        return () => {
            window.removeEventListener('touchmove', preventTouchMove);
            window.removeEventListener('gesturestart', preventGesture);
        };
    }, [isAnyPieceActive]);
    const handleBoardSlotChange = (newRows, newColumns) => {
        setBoardGrid(newRows, newColumns);
    };
    const handleRefresh = () => {
        // Call custom refresh logic if provided
        onRefresh?.();
        // Always refresh the board
        refreshBoard();
    };
    const handlePuzzleComplete = () => {
        setTimerIsRunning(false);
        onComplete?.();
    };
    // Calculate aspect ratio for responsive behavior
    const aspectRatio = options.board.width / options.board.height;
    // Determine container classes and styles
    const containerClasses = options.puzzle.responsive
        ? `${styles.puzzle} ${styles.responsive}`
        : styles.puzzle;
    const puzzleContainerStyle = useMemo(() => {
        const aspectRatioStyle = options.puzzle.responsive
            ? { '--puzzle-aspect-ratio': aspectRatio.toString() }
            : {};
        return {
            ...aspectRatioStyle,
            touchAction: isAnyPieceActive ? 'none' : undefined,
            overscrollBehavior: isAnyPieceActive ? 'none' : undefined,
        };
    }, [options.puzzle.responsive, aspectRatio, isAnyPieceActive]);
    return (_jsxs("div", { "data-testid": "puzzle-content", className: containerClasses, style: puzzleContainerStyle, children: [options.puzzle.timer.enabled || options.puzzle.refreshButton.enabled ? (_jsxs("div", { className: styles.settingsContainer, children: [options.puzzle.timer.enabled && (_jsx(Timer, { className: options.puzzle.timer.className, isRunning: timerIsRunning })), options.puzzle.refreshButton.enabled && (_jsx(RefreshButton, { className: options.puzzle.refreshButton.className, 
                        // dataTestId="refresh-button"
                        onRefresh: handleRefresh }))] })) : null, _jsx(Board, { boardHeight: options.board.height, boardWidth: options.board.width, className: options.board.className, columns: columns, image: image, onPuzzleComplete: handlePuzzleComplete, outlineStrokeColor: options.board.outlineStrokeColor, puzzlePieceOptions: options.puzzlePiece, rows: rows, scatterArea: options.board.scatterArea, showBoardSlotOutlines: options.board.showBoardSlotOutlines, snapThreshold: options.board.snapThreshold, onAnyPieceActiveChange: setIsAnyPieceActive }, `${rows}-${columns}-${refreshCount}`), options.puzzle.rowsAndColumns.enabled && (_jsx("div", { className: styles.settingsContainer, children: _jsx(EditRowsColumns, { className: options.puzzle.rowsAndColumns.className, currentRows: rows, currentColumns: columns, onBoardSlotChange: handleBoardSlotChange }) }))] }));
};
export default PuzzleContent;
//# sourceMappingURL=index.js.map