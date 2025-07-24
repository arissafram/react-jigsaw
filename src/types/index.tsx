type ComputedEdgeMap = [number, number, number, number][][];

export interface JigsawPathOptions {
  boardHeight: number;
  boardWidth: number;
  columns: number;
  edgeMap: ComputedEdgeMap;
  rows: number;
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
}

export interface PuzzleOptions {
  board: {
    className: string;
    columns: number;
    height: number;
    rows: number;
    showGridOutlines: boolean;
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

export interface GridSlot {
  pieceRow: number;
  pieceCol: number;
}

export interface PiecePosition extends GridSlot {
  x: number;
  y: number;
}

export type SnappedPieceIds = Set<string>;

export type BoardRef = React.RefObject<SVGSVGElement | null>;
