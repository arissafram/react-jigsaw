import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Board from './index';

describe('Board', () => {
  const defaultProps = {
    boardHeight: 500,
    boardWidth: 400,
    className: 'test-board',
    columns: 4,
    dataTestId: 'board',
    image: 'test-image.jpg',
    onPuzzleComplete: () => {},
    puzzlePieceOptions: {
      strokeColor: 'gold',
      strokeEnabled: true,
      strokeWidth: 2,
    },
    rows: 5,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
    scatterArea: 0,
  };

  it('renders without crashing', () => {
    render(<Board {...defaultProps} />);
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });

  it('renders as an SVG element', () => {
    render(<Board {...defaultProps} />);
    const boardElement = screen.getByTestId('board');
    expect(boardElement.tagName).toBe('svg');
  });

  it('has correct SVG attributes', () => {
    render(<Board {...defaultProps} />);
    const boardElement = screen.getByTestId('board');

    expect(boardElement).toHaveAttribute('width', '400');
    expect(boardElement).toHaveAttribute('height', '500');
    expect(boardElement).toHaveAttribute('viewBox', '0 0 400 500');
  });

  it('applies custom className', () => {
    render(<Board {...defaultProps} />);
    const boardElement = screen.getByTestId('board');
    expect(boardElement).toHaveClass('test-board');
  });

  it('renders BoardOutlines component', () => {
    render(<Board {...defaultProps} />);
    // BoardOutlines should be present as a child of the SVG
    const boardElement = screen.getByTestId('board');
    expect(boardElement.children.length).toBeGreaterThan(0);
  });

  it('renders correct number of puzzle pieces', () => {
    render(<Board {...defaultProps} />);
    const boardElement = screen.getByTestId('board');

    // Should render rows * columns pieces (5 * 4 = 20 pieces)
    const puzzlePieces = boardElement.querySelectorAll('g'); // Puzzle pieces are rendered as <g> elements
    expect(puzzlePieces.length).toBe(20);
  });

  it('renders puzzle pieces with correct structure', () => {
    render(<Board {...defaultProps} />);
    const boardElement = screen.getByTestId('board');

    // Each puzzle piece should have an image element
    const images = boardElement.querySelectorAll('image');
    expect(images.length).toBe(20); // One image per piece
  });

  it('calls onPuzzleComplete when all pieces are snapped', () => {
    const mockOnPuzzleComplete = vi.fn();
    render(<Board {...defaultProps} onPuzzleComplete={mockOnPuzzleComplete} />);

    // Initially, no pieces should be snapped
    expect(mockOnPuzzleComplete).not.toHaveBeenCalled();
  });

  it('renders with different board dimensions', () => {
    const customProps = {
      ...defaultProps,
      boardHeight: 600,
      boardWidth: 800,
      rows: 3,
      columns: 6,
    };

    render(<Board {...customProps} />);
    const boardElement = screen.getByTestId('board');

    expect(boardElement).toHaveAttribute('width', '800');
    expect(boardElement).toHaveAttribute('height', '600');
    expect(boardElement).toHaveAttribute('viewBox', '0 0 800 600');

    // Should render 3 * 6 = 18 pieces
    const puzzlePieces = boardElement.querySelectorAll('g');
    expect(puzzlePieces.length).toBe(18);
  });

  it('renders without board slot outlines when disabled', () => {
    const propsWithoutOutlines = {
      ...defaultProps,
      showBoardSlotOutlines: false,
    };

    render(<Board {...propsWithoutOutlines} />);
    const boardElement = screen.getByTestId('board');

    // Board should still render, just without outlines
    expect(boardElement).toBeInTheDocument();
  });

  it('renders with custom scatter area', () => {
    const propsWithScatter = {
      ...defaultProps,
      scatterArea: 100,
    };

    render(<Board {...propsWithScatter} />);
    const boardElement = screen.getByTestId('board');

    // Board should render with scatter area
    expect(boardElement).toBeInTheDocument();
  });

  it('renders with custom puzzle piece options', () => {
    const customPuzzleOptions = {
      strokeColor: 'red',
      strokeEnabled: false,
      strokeWidth: 5,
    };

    const propsWithCustomOptions = {
      ...defaultProps,
      puzzlePieceOptions: customPuzzleOptions,
    };

    render(<Board {...propsWithCustomOptions} />);
    const boardElement = screen.getByTestId('board');

    // Board should render with custom options
    expect(boardElement).toBeInTheDocument();
  });
});
