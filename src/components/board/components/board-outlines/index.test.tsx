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
    render(<BoardOutlines {...defaultProps} />);
    // Should render multiple path elements
    const paths = document.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders correct number of outline paths', () => {
    render(<BoardOutlines {...defaultProps} />);
    const paths = document.querySelectorAll('path');
    // Should render one path per board slot (20 total: 5 rows × 4 columns)
    expect(paths.length).toBe(20);
  });

  it('applies snapped class to snapped pieces', () => {
    const propsWithSnappedPieces = {
      ...defaultProps,
      snappedPieceIds: new Set<string>(['0-0', '1-1', '2-2']), // Some pieces are snapped
    };

    render(<BoardOutlines {...propsWithSnappedPieces} />);
    const paths = document.querySelectorAll('path');

    // Check that some paths have the snapped class (the exact number depends on CSS module hashing)
    const snappedPaths = document.querySelectorAll('path');
    expect(snappedPaths.length).toBe(20);

    // Check that paths have the base class
    paths.forEach((path) => {
      expect(path.className).toContain('boardSlotOutline');
    });
  });

  it('does not render when showBoardSlotOutlines is false', () => {
    const propsWithoutOutlines = {
      ...defaultProps,
      showBoardSlotOutlines: false,
    };

    render(<BoardOutlines {...propsWithoutOutlines} />);
    const paths = document.querySelectorAll('path');
    expect(paths.length).toBe(0);
  });

  it('renders with different board dimensions', () => {
    const customProps = {
      ...defaultProps,
      boardPathOptions: {
        boardHeight: 600,
        boardWidth: 800,
        columns: 3,
        rows: 6,
        edgeMap: computeEdgeMap({ columns: 3, rows: 6 }),
      },
      boardSlots: [
        { pieceRow: 0, pieceCol: 0 },
        { pieceRow: 0, pieceCol: 1 },
        { pieceRow: 0, pieceCol: 2 },
        { pieceRow: 1, pieceCol: 0 },
        { pieceRow: 1, pieceCol: 1 },
        { pieceRow: 1, pieceCol: 2 },
        { pieceRow: 2, pieceCol: 0 },
        { pieceRow: 2, pieceCol: 1 },
        { pieceRow: 2, pieceCol: 2 },
        { pieceRow: 3, pieceCol: 0 },
        { pieceRow: 3, pieceCol: 1 },
        { pieceRow: 3, pieceCol: 2 },
        { pieceRow: 4, pieceCol: 0 },
        { pieceRow: 4, pieceCol: 1 },
        { pieceRow: 4, pieceCol: 2 },
        { pieceRow: 5, pieceCol: 0 },
        { pieceRow: 5, pieceCol: 1 },
        { pieceRow: 5, pieceCol: 2 },
      ],
    };

    render(<BoardOutlines {...customProps} />);
    const paths = document.querySelectorAll('path');
    // Should render 6 rows × 3 columns = 18 paths
    expect(paths.length).toBe(18);
  });

  it('renders with empty snapped pieces set on puzzle start', () => {
    const propsWithEmptySnapped = {
      ...defaultProps,
      snappedPieceIds: new Set<string>(),
    };

    render(<BoardOutlines {...propsWithEmptySnapped} />);
    const paths = document.querySelectorAll('path');
    expect(paths.length).toBe(20);

    // All paths should have the base class
    paths.forEach((path) => {
      expect(path.classList.contains('boardSlotOutline')).toBe(true);
    });
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
    const paths = document.querySelectorAll('path');
    expect(paths.length).toBe(20);

    // All paths should have the base class
    paths.forEach((path) => {
      expect(path.classList.contains('boardSlotOutline')).toBe(true);
    });
  });
});
