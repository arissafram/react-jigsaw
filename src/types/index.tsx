type ComputedEdgeMap = [number, number, number, number][][];

export interface JigsawPathOptions {
  width: number;
  height: number;
  rows: number;
  columns: number;
  edgeMap: ComputedEdgeMap;
}

export interface InitialPuzzleOptions {
  board?: {
    className?: string;
    columns?: number;
    height?: number;
    rows?: number;
    showGridOutlines?: boolean;
    width?: number;
  };
  puzzlePiece?: {
    strokeColor?: string;
    strokeEnabled?: boolean;
    strokeWidth?: number;
  };
  puzzle?: {
    className?: string;
    settings?: {
      className?: string;
      enabled?: boolean;
      timer?: {
        className?: string;
        enabled?: boolean;
      };
      refreshButton?: {
        className?: string;
        enabled?: boolean;
      };
      rowsAndColumns?: {
        className?: string;
        enabled?: boolean;
      };
    };
  };
  shuffleArea?: ShuffleArea;
}

export interface PuzzleOptions {
  board: {
    className: string;
    columns: number;
    height: number;
    rows: number;
    showGridOutlines: boolean;
    shuffleArea: ShuffleArea;
    width: number;
  };
  onComplete?: () => void;
  puzzle: {
    className: string;
    settings: {
      className: string;
      enabled: boolean;
      timer: {
        className: string;
        enabled: boolean;
      };
      refreshButton: {
        className: string;
        enabled: boolean;
      };
      rowsAndColumns: {
        className: string;
        enabled: boolean;
      };
    };
  };
  puzzlePiece: {
    strokeColor: string;
    strokeEnabled: boolean;
    strokeWidth: number;
  };
}

export interface PiecePosition {
  pieceRow: number;
  pieceCol: number;
  x: number;
  y: number;
}

export type ShuffleArea = 'anywhere' | 'board';
