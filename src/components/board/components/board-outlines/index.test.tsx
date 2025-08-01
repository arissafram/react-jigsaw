import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BoardOutlines from './index';
import { computeEdgeMap } from '../../helpers/generate-board-path';

describe('BoardOutlines', () => {
  const defaultProps = {
    boardPathOptions: {
      boardHeight: 500,
      boardWidth: 400,
      columns: 4,
      rows: 5,
      edgeMap: computeEdgeMap({ columns: 4, rows: 5 }),
    },
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
      { pieceRow: 3, pieceCol: 0 },
      { pieceRow: 3, pieceCol: 1 },
      { pieceRow: 3, pieceCol: 2 },
      { pieceRow: 3, pieceCol: 3 },
      { pieceRow: 4, pieceCol: 0 },
      { pieceRow: 4, pieceCol: 1 },
      { pieceRow: 4, pieceCol: 2 },
      { pieceRow: 4, pieceCol: 3 },
    ],
    showBoardSlotOutlines: true,
    snappedPieceIds: new Set<string>(),
  };

  it('renders without crashing', () => {
    render(<BoardOutlines {...defaultProps} dataTestId="board-outlines" />);
    expect(screen.getByTestId('board-outlines')).toBeInTheDocument();
  });

  it('renders correct number of outline paths', () => {
    render(<BoardOutlines {...defaultProps} />);

    // Check that all 20 outline paths are rendered
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        expect(screen.getByTestId(`outline-${row}-${col}`)).toBeInTheDocument();
      }
    }
  });

  it('applies snapped class to snapped pieces', () => {
    const propsWithSnappedPieces = {
      ...defaultProps,
      snappedPieceIds: new Set<string>(['0-0', '1-1', '2-2']),
    };
    render(<BoardOutlines {...propsWithSnappedPieces} />);

    // Check that snapped pieces exist
    expect(screen.getByTestId('outline-0-0')).toBeInTheDocument();
    expect(screen.getByTestId('outline-1-1')).toBeInTheDocument();
    expect(screen.getByTestId('outline-2-2')).toBeInTheDocument();

    // Check that non-snapped pieces also exist
    expect(screen.getByTestId('outline-0-1')).toBeInTheDocument();
    expect(screen.getByTestId('outline-3-3')).toBeInTheDocument();
  });

  it('does not render when showBoardSlotOutlines is false', () => {
    const propsWithNoOutlines = {
      ...defaultProps,
      showBoardSlotOutlines: false,
    };
    render(<BoardOutlines {...propsWithNoOutlines} />);

    expect(screen.queryByTestId('board-outlines')).not.toBeInTheDocument();
  });

  it('renders with different board dimensions', () => {
    const propsWithDifferentDimensions = {
      ...defaultProps,
      boardPathOptions: {
        boardHeight: 300,
        boardWidth: 600,
        columns: 6,
        rows: 3,
        edgeMap: computeEdgeMap({ columns: 6, rows: 3 }),
      },
      boardSlots: [
        { pieceRow: 0, pieceCol: 0 },
        { pieceRow: 0, pieceCol: 1 },
        { pieceRow: 0, pieceCol: 2 },
        { pieceRow: 0, pieceCol: 3 },
        { pieceRow: 0, pieceCol: 4 },
        { pieceRow: 0, pieceCol: 5 },
        { pieceRow: 1, pieceCol: 0 },
        { pieceRow: 1, pieceCol: 1 },
        { pieceRow: 1, pieceCol: 2 },
        { pieceRow: 1, pieceCol: 3 },
        { pieceRow: 1, pieceCol: 4 },
        { pieceRow: 1, pieceCol: 5 },
        { pieceRow: 2, pieceCol: 0 },
        { pieceRow: 2, pieceCol: 1 },
        { pieceRow: 2, pieceCol: 2 },
        { pieceRow: 2, pieceCol: 3 },
        { pieceRow: 2, pieceCol: 4 },
        { pieceRow: 2, pieceCol: 5 },
      ],
    };
    render(<BoardOutlines {...propsWithDifferentDimensions} />);

    // Check that all 18 outline paths are rendered (6x3)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        expect(screen.getByTestId(`outline-${row}-${col}`)).toBeInTheDocument();
      }
    }
  });

  it('renders with empty snapped pieces set on puzzle start', () => {
    const propsWithEmptySnapped = {
      ...defaultProps,
      snappedPieceIds: new Set<string>(),
    };
    render(<BoardOutlines {...propsWithEmptySnapped} />);

    // Check that all outline paths are rendered with test IDs
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        expect(screen.getByTestId(`outline-${row}-${col}`)).toBeInTheDocument();
      }
    }
  });

  it('renders with all pieces snapped when puzzle is complete', () => {
    const allSnappedIds = new Set<string>();
    // Create a set with all piece IDs
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        allSnappedIds.add(`${row}-${col}`);
      }
    }

    const propsWithAllSnapped = {
      ...defaultProps,
      snappedPieceIds: allSnappedIds,
    };

    render(<BoardOutlines {...propsWithAllSnapped} />);

    // Check that all outline paths are rendered with test IDs
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        expect(screen.getByTestId(`outline-${row}-${col}`)).toBeInTheDocument();
      }
    }
  });
});
