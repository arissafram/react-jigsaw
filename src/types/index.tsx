export interface PuzzleOptions {
  board: {
    className: string;
    columns: number;
    height: number;
    rows: number;
    showGridOutlines: boolean;
    width: number;
  };
  puzzlePiece: {
    strokeColor: string;
    strokeEnabled: boolean;
    strokeWidth: number;
  };
  shuffleArea: 'anywhere' | 'board';
}

export interface PiecePosition {
  pieceRow: number;
  pieceCol: number;
  x: number;
  y: number;
}

export interface JigsawPathOptions {
  width: number;
  height: number;
  rows: number;
  columns: number;
  edgeMap?: [number, number, number, number][][];
}
