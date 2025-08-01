import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PuzzlePiece from './index';

// Mock the useMovePieces hook
vi.mock('@/hooks/use-move-pieces', () => ({
  useMovePieces: vi.fn(() => ({
    ref: { current: null },
    dragState: { x: 0, y: 0, isDragging: false },
    isSnapped: false,
    moveBy: vi.fn(),
    trySnap: vi.fn(() => true),
    handlers: {
      onPointerDown: vi.fn(),
      onPointerMove: vi.fn(),
      onPointerUp: vi.fn(),
    },
  })),
}));

describe('PuzzlePiece', () => {
  const defaultProps = {
    boardHeight: 500,
    boardWidth: 400,
    image: 'test-image.jpg',
    pieceIndex: 0,
    initialX: 100,
    initialY: 200,
    path: 'M0,0 L100,0 L100,100 L0,100 Z',
    snapThreshold: 20,
    boardRef: { current: null },
    targetX: 0,
    targetY: 0,
    puzzlePieceOptions: {
      strokeColor: 'red',
      strokeEnabled: true,
    },
    boardSlotKey: '0-0',
  };

  it('renders without crashing', () => {
    render(<PuzzlePiece {...defaultProps} />);
    // The component renders as an SVG <g> element, so we check for its presence
    const puzzlePiece = document.querySelector('g');
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('renders with correct image attributes', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const image = document.querySelector('image');
    expect(image).toHaveAttribute('href', 'test-image.jpg');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '500');
    expect(image).toHaveAttribute('preserveAspectRatio', 'xMidYMid slice');
  });

  it('renders with correct clip path', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const clipPath = document.querySelector('clipPath');
    expect(clipPath).toHaveAttribute('id', 'piece-clip-0');

    const path = clipPath?.querySelector('path');
    expect(path).toHaveAttribute('d', 'M0,0 L100,0 L100,100 L0,100 Z');
  });

  it('renders with correct stroke when stroke is enabled', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const strokePath = document.querySelector('path[fill="none"]');
    expect(strokePath).toHaveAttribute('stroke', 'red');
    expect(strokePath).toHaveAttribute('stroke-width', '2');
  });

  it('renders without stroke when stroke is disabled', () => {
    const propsWithoutStroke = {
      ...defaultProps,
      puzzlePieceOptions: {
        ...defaultProps.puzzlePieceOptions,
        strokeEnabled: false,
      },
    };
    render(<PuzzlePiece {...propsWithoutStroke} />);
    const strokePath = document.querySelector('path[fill="none"]');
    expect(strokePath).toHaveAttribute('stroke', '');
    expect(strokePath).toHaveAttribute('stroke-width', '0');
  });

  it('has correct tabIndex when not snapped', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const puzzlePiece = document.querySelector('g');
    expect(puzzlePiece).toHaveAttribute('tabindex', '0');
  });

  it('works with different piece indices', () => {
    render(<PuzzlePiece {...defaultProps} pieceIndex={5} />);
    const clipPath = document.querySelector('clipPath');
    expect(clipPath).toHaveAttribute('id', 'piece-clip-5');
  });

  it('works with different board dimensions', () => {
    const customProps = {
      ...defaultProps,
      boardWidth: 600,
      boardHeight: 800,
    };
    render(<PuzzlePiece {...customProps} />);
    const image = document.querySelector('image');
    expect(image).toHaveAttribute('width', '600');
    expect(image).toHaveAttribute('height', '800');
  });

  it('renders with correct className', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const puzzlePiece = document.querySelector('g');
    expect(puzzlePiece?.className).toContain('puzzlePiece');
  });

  it('renders with correct path data', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const strokePath = document.querySelector('path[fill="none"]');
    expect(strokePath).toHaveAttribute('d', 'M0,0 L100,0 L100,100 L0,100 Z');
  });

  it('renders with correct image clip path reference', () => {
    render(<PuzzlePiece {...defaultProps} />);
    const image = document.querySelector('image');
    expect(image).toHaveAttribute('clip-path', 'url(#piece-clip-0)');
  });
});
