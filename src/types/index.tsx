type ComputedEdgeMap = [number, number, number, number][][];

export type BoardRef = React.RefObject<SVGSVGElement | null>;

export interface BoardPathOptions {
  boardHeight: number;
  boardWidth: number;
  columns: number;
  edgeMap: ComputedEdgeMap;
  rows: number;
}

export interface BoardSlot {
  pieceCol: number;
  pieceRow: number;
}

export interface InitialPuzzleOptions {
  board?: {
    className?: string;
    columns?: number;
    height?: number;
    responsive?: boolean;
    rows?: number;
    scatterArea?: number;
    showBoardSlotOutlines?: boolean;
    snapThreshold?: number;
    width?: number;
  };
  onComplete?: () => void;
  onRefresh?: () => void;
  puzzle?: {
    className?: string;
    responsive?: boolean;
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
  puzzlePiece?: {
    strokeColor?: string;
    strokeEnabled?: boolean;
    strokeWidth?: number;
  };
}

export interface PiecePosition extends BoardSlot {
  x: number;
  y: number;
}

export interface PuzzleOptions {
  board: {
    className: string;
    columns: number;
    height: number;
    responsive: boolean;
    rows: number;
    scatterArea: number;
    showBoardSlotOutlines: boolean;
    snapThreshold: number;
    width: number;
  };
  onComplete: () => void;
  onRefresh: () => void;
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

export type SnappedPieceIds = Set<string>;
