import { jsx as _jsx } from "react/jsx-runtime";
import { REACT_JIGSAW_STORAGE_KEY } from '@/constants';
import { createContext, useContext, useState } from 'react';
const PuzzleContext = createContext(undefined);
// On first mount, check localStorage for saved values
const getInitialBoardConfig = (checkLocalStorage) => {
    if (typeof window !== 'undefined' && checkLocalStorage) {
        const boardConfig = localStorage.getItem(REACT_JIGSAW_STORAGE_KEY);
        if (boardConfig) {
            const parsed = JSON.parse(boardConfig);
            if (typeof parsed.rows === 'number' && typeof parsed.columns === 'number') {
                return { rows: parsed.rows, columns: parsed.columns };
            }
        }
    }
    return {};
};
export const PuzzleProvider = (props) => {
    const { rows: rowsFromStorage, columns: columnsFromStorage } = getInitialBoardConfig(props.checkLocalStorage);
    const [columns, setColumns] = useState(columnsFromStorage ?? props.columns);
    const [rows, setRows] = useState(rowsFromStorage ?? props.rows);
    const [timerIsRunning, setTimerIsRunning] = useState(true);
    const [refreshCount, setRefreshCount] = useState(0);
    const numPieces = rows * columns;
    const setBoardGrid = (newRows, newColumns) => {
        setRows(newRows);
        setColumns(newColumns);
        setTimerIsRunning(false);
        setTimeout(() => setTimerIsRunning(true), 10);
    };
    const refreshBoard = () => {
        setTimerIsRunning(false);
        setRefreshCount((c) => c + 1);
        // 10ms workaround to ensure the timer is running after the board is refreshed
        setTimeout(() => setTimerIsRunning(true), 10);
    };
    const value = {
        columns,
        numPieces,
        refreshCount,
        rows,
        timerIsRunning,
        setBoardGrid,
        refreshBoard,
        setTimerIsRunning,
    };
    return _jsx(PuzzleContext.Provider, { value: value, children: props.children });
};
export const usePuzzleContext = () => {
    const context = useContext(PuzzleContext);
    if (!context) {
        throw new Error('usePuzzleContext must be used within a PuzzleProvider');
    }
    return context;
};
//# sourceMappingURL=puzzle-context.js.map