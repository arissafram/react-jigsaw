import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { shufflePieces } from './shuffle-pieces';

describe('shufflePieces', () => {
  const defaultParams = {
    boardWidth: 400,
    boardHeight: 500,
    boardSlots: [
      { pieceRow: 0, pieceCol: 0 },
      { pieceRow: 0, pieceCol: 1 },
      { pieceRow: 0, pieceCol: 2 },
      { pieceRow: 0, pieceCol: 3 },
      { pieceRow: 1, pieceCol: 0 },
      { pieceRow: 1, pieceCol: 1 },
      { pieceRow: 1, pieceCol: 2 },
      { pieceRow: 1, pieceCol: 3 },
      { pieceRow: 2, pieceCol: 0 },
      { pieceRow: 2, pieceCol: 1 },
      { pieceRow: 2, pieceCol: 2 },
      { pieceRow: 2, pieceCol: 3 },
    ],
    pieceHeight: 125, // 500 / 4 rows
    pieceWidth: 100, // 400 / 4 columns
    scatterArea: 0,
  };

  beforeEach(() => {
    // Mock Math.random to return predictable values for testing
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the same number of pieces as input', () => {
    const shuffledPieces = shufflePieces(defaultParams);
    expect(shuffledPieces).toHaveLength(defaultParams.boardSlots.length);
  });

  it('preserves all original piece coordinates', () => {
    const shuffledPieces = shufflePieces(defaultParams);

    // Check that all original pieceRow and pieceCol values are preserved
    const originalCoords = defaultParams.boardSlots.map(
      (slot) => `${slot.pieceRow}-${slot.pieceCol}`,
    );
    const shuffledCoords = shuffledPieces.map((piece) => `${piece.pieceRow}-${piece.pieceCol}`);

    // Should contain the same coordinates (order may be different due to shuffling)
    expect(shuffledCoords.sort()).toEqual(originalCoords.sort());
  });

  it('assigns x and y positions to each piece', () => {
    const shuffledPieces = shufflePieces(defaultParams);

    shuffledPieces.forEach((piece) => {
      expect(piece).toHaveProperty('x');
      expect(piece).toHaveProperty('y');
      expect(typeof piece.x).toBe('number');
      expect(typeof piece.y).toBe('number');
    });
  });

  it('calculates positions within board boundaries when scatterArea is 0', () => {
    const shuffledPieces = shufflePieces(defaultParams);

    shuffledPieces.forEach((piece) => {
      // With scatterArea = 0, pieces should be within the original board area
      // The x and y are offsets, so they should be within reasonable bounds
      expect(piece.x).toBeGreaterThanOrEqual(-defaultParams.boardWidth);
      expect(piece.x).toBeLessThanOrEqual(defaultParams.boardWidth);
      expect(piece.y).toBeGreaterThanOrEqual(-defaultParams.boardHeight);
      expect(piece.y).toBeLessThanOrEqual(defaultParams.boardHeight);
    });
  });

  it('expands scattering area when scatterArea is provided', () => {
    const paramsWithScatter = {
      ...defaultParams,
      scatterArea: 100,
    };

    const shuffledPieces = shufflePieces(paramsWithScatter);

    // With scatterArea = 100, the expanded area should be 600x700
    // Pieces should be positioned within this expanded area
    shuffledPieces.forEach((piece) => {
      // The x and y are offsets, so they should be within the expanded bounds
      expect(piece.x).toBeGreaterThanOrEqual(-600); // -scatterArea - boardWidth
      expect(piece.x).toBeLessThanOrEqual(600); // scatterArea + boardWidth
      expect(piece.y).toBeGreaterThanOrEqual(-700); // -scatterArea - boardHeight
      expect(piece.y).toBeLessThanOrEqual(700); // scatterArea + boardHeight
    });
  });

  it('works with different board dimensions', () => {
    const customParams = {
      boardWidth: 600,
      boardHeight: 300,
      boardSlots: [
        { pieceRow: 0, pieceCol: 0 },
        { pieceRow: 0, pieceCol: 1 },
        { pieceRow: 1, pieceCol: 0 },
        { pieceRow: 1, pieceCol: 1 },
      ],
      pieceHeight: 150, // 300 / 2 rows
      pieceWidth: 300, // 600 / 2 columns
      scatterArea: 50,
    };

    const shuffledPieces = shufflePieces(customParams);

    expect(shuffledPieces).toHaveLength(4);
    shuffledPieces.forEach((piece) => {
      expect(piece).toHaveProperty('x');
      expect(piece).toHaveProperty('y');
      expect(piece).toHaveProperty('pieceRow');
      expect(piece).toHaveProperty('pieceCol');
    });
  });

  it('handles single piece', () => {
    const singlePieceParams = {
      boardWidth: 100,
      boardHeight: 100,
      boardSlots: [{ pieceRow: 0, pieceCol: 0 }],
      pieceHeight: 100,
      pieceWidth: 100,
      scatterArea: 0,
    };

    const shuffledPieces = shufflePieces(singlePieceParams);

    expect(shuffledPieces).toHaveLength(1);
    expect(shuffledPieces[0]).toEqual({
      pieceRow: 0,
      pieceCol: 0,
      x: expect.any(Number),
      y: expect.any(Number),
    });
  });

  it('calculates correct offsets for piece positions', () => {
    // Mock Math.random to return a predictable value
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const shuffledPieces = shufflePieces(defaultParams);

    // With Math.random() returning 0.5, the shuffled positions should be predictable
    // For the first piece (0,0), shuffledX = -0 + 0.5 * (400 - 100) = 150
    // shuffledY = -0 + 0.5 * (500 - 125) = 187.5
    // originalBoardX = 0 * 100 = 0, originalBoardY = 0 * 125 = 0
    // So x = 150 - 0 = 150, y = 187.5 - 0 = 187.5

    // Check that the first piece has the expected offset
    const firstPiece = shuffledPieces.find((p) => p.pieceRow === 0 && p.pieceCol === 0);
    if (firstPiece) {
      expect(firstPiece.x).toBe(150);
      expect(firstPiece.y).toBe(187.5);
    }
  });

  it('does not modify the original boardSlots array', () => {
    const originalSlots = [...defaultParams.boardSlots];
    shufflePieces(defaultParams);

    // The original array should remain unchanged
    expect(defaultParams.boardSlots).toEqual(originalSlots);
  });
});
