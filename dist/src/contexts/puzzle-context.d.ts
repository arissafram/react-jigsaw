interface PuzzleContextState {
    columns: number;
    numPieces: number;
    refreshCount: number;
    rows: number;
    timerIsRunning: boolean;
    setBoardGrid: (rows: number, columns: number) => void;
    refreshBoard: () => void;
    setTimerIsRunning: (running: boolean) => void;
}
interface PuzzleProviderProps {
    checkLocalStorage: boolean;
    children: React.ReactNode;
    columns: number;
    rows: number;
}
export declare const PuzzleProvider: React.FC<PuzzleProviderProps>;
export declare const usePuzzleContext: () => PuzzleContextState;
export {};
//# sourceMappingURL=puzzle-context.d.ts.map