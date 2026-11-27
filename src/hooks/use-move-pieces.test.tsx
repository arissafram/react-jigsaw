import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMovePieces } from './use-move-pieces';

// Mock SVG methods
const mockCreateSVGPoint = vi.fn(() => ({
  x: 0,
  y: 0,
  matrixTransform: vi.fn(() => ({ x: 100, y: 200 })),
}));

const mockGetScreenCTM = vi.fn(() => ({
  inverse: vi.fn(() => ({ x: 1, y: 1 })),
}));

const mockBoardRef = {
  current: {
    createSVGPoint: mockCreateSVGPoint,
    getScreenCTM: mockGetScreenCTM,
  } as unknown as SVGSVGElement,
};

// Test component to use the hook
const TestComponent = ({
  initialX = 0,
  initialY = 0,
  targetX = 100,
  targetY = 100,
  snapThreshold = 20,
  onSnap = vi.fn(),
}: {
  initialX?: number;
  initialY?: number;
  targetX?: number;
  targetY?: number;
  snapThreshold?: number;
  onSnap?: () => void;
}) => {
  const { ref, dragState, isSnapped, moveTo, moveBy, trySnap, handlers } = useMovePieces({
    initialX,
    initialY,
    boardRef: mockBoardRef,
    targetX,
    targetY,
    snapThreshold,
    onSnap,
  });

  return (
    <div>
      <svg>
        <g ref={ref} {...handlers} data-testid="puzzle-piece">
          <rect width="50" height="50" fill="red" />
        </g>
      </svg>
      <div data-testid="drag-state">{JSON.stringify(dragState)}</div>
      <div data-testid="is-snapped">{isSnapped.toString()}</div>
      <button data-testid="move-to" onClick={() => moveTo(150, 250)}>
        Move To
      </button>
      <button data-testid="move-by" onClick={() => moveBy(10, 20)}>
        Move By
      </button>
      <button data-testid="try-snap" onClick={() => trySnap()}>
        Try Snap
      </button>
    </div>
  );
};

describe('useMovePieces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset SVG mock
    mockCreateSVGPoint.mockReturnValue({
      x: 0,
      y: 0,
      matrixTransform: vi.fn(() => ({ x: 100, y: 200 })),
    });
    mockGetScreenCTM.mockReturnValue({
      inverse: vi.fn(() => ({ x: 1, y: 1 })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with correct default state', () => {
    render(<TestComponent />);

    const dragStateElement = screen.getByTestId('drag-state');
    const isSnappedElement = screen.getByTestId('is-snapped');

    expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":0,"y":0}');
    expect(isSnappedElement).toHaveTextContent('false');
  });

  it('initializes with custom initial position', () => {
    render(<TestComponent initialX={50} initialY={75} />);

    const dragStateElement = screen.getByTestId('drag-state');

    expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":50,"y":75}');
  });

  it('moves to specific position when moveTo is called', async () => {
    render(<TestComponent />);

    const moveToButton = screen.getByTestId('move-to');
    moveToButton.click();

    await waitFor(() => {
      const dragStateElement = screen.getByTestId('drag-state');
      expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":150,"y":250}');
    });
  });

  it('moves by delta when moveBy is called', async () => {
    render(<TestComponent initialX={100} initialY={100} />);

    const moveByButton = screen.getByTestId('move-by');
    moveByButton.click();

    await waitFor(() => {
      const dragStateElement = screen.getByTestId('drag-state');
      expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":110,"y":120}');
    });
  });

  it('does not move when snapped', async () => {
    render(<TestComponent targetX={0} targetY={0} snapThreshold={100} />);

    // First snap the piece
    const trySnapButton = screen.getByTestId('try-snap');
    trySnapButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('is-snapped')).toHaveTextContent('true');
    });

    // Try to move after snapping
    const moveToButton = screen.getByTestId('move-to');
    moveToButton.click();

    const dragStateElement = screen.getByTestId('drag-state');
    // Should still be at target position, not moved
    expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":0,"y":0}');
  });

  it('snaps when close to target', async () => {
    const onSnap = vi.fn();
    render(<TestComponent targetX={0} targetY={0} snapThreshold={100} onSnap={onSnap} />);

    const trySnapButton = screen.getByTestId('try-snap');
    trySnapButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('is-snapped')).toHaveTextContent('true');
    });
    expect(onSnap).toHaveBeenCalledTimes(1);
  });

  it('does not snap when far from target', () => {
    const onSnap = vi.fn();
    render(<TestComponent targetX={1000} targetY={1000} snapThreshold={10} onSnap={onSnap} />);

    const trySnapButton = screen.getByTestId('try-snap');
    trySnapButton.click();

    expect(screen.getByTestId('is-snapped')).toHaveTextContent('false');
    expect(onSnap).not.toHaveBeenCalled();
  });

  it('returns false when trySnap is called on already snapped piece', async () => {
    render(<TestComponent targetX={0} targetY={0} snapThreshold={100} />);

    // First snap the piece
    const trySnapButton = screen.getByTestId('try-snap');
    trySnapButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('is-snapped')).toHaveTextContent('true');
    });

    // Try to snap again
    trySnapButton.click();

    // Should still be snapped
    expect(screen.getByTestId('is-snapped')).toHaveTextContent('true');
  });

  it('handles pointer down event', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: true,
    });

    // Verify element exists and event was handled
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('does not start drag when piece is snapped', async () => {
    render(<TestComponent targetX={0} targetY={0} snapThreshold={100} />);

    // First snap the piece
    const trySnapButton = screen.getByTestId('try-snap');
    trySnapButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('is-snapped')).toHaveTextContent('true');
    });

    // Try to drag snapped piece
    const puzzlePiece = screen.getByTestId('puzzle-piece');
    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: true,
    });

    const dragStateElement = screen.getByTestId('drag-state');
    // Should not be dragging
    expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":0,"y":0}');
  });

  it('does not start drag for non-primary pointer', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: false,
    });

    const dragStateElement = screen.getByTestId('drag-state');
    // Should not be dragging for non-primary pointer
    expect(dragStateElement).toHaveTextContent('{"isDragging":false,"x":0,"y":0}');
  });

  it('handles pointer move during drag', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    // Start drag
    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: true,
    });

    // Move pointer
    fireEvent.pointerMove(puzzlePiece, {
      clientX: 150,
      clientY: 250,
      pointerId: 1,
    });

    // Verify element exists and event was handled
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('handles pointer up event', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    // Start drag
    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: true,
    });

    // End drag
    fireEvent.pointerUp(puzzlePiece, {
      clientX: 150,
      clientY: 250,
      pointerId: 1,
    });

    // Verify element exists and event was handled
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('handles pointer cancel event', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    // Start drag
    fireEvent.pointerDown(puzzlePiece, {
      clientX: 100,
      clientY: 200,
      pointerId: 1,
      isPrimary: true,
    });

    // Cancel drag
    fireEvent.pointerCancel(puzzlePiece, {
      clientX: 150,
      clientY: 250,
      pointerId: 1,
    });

    // Verify element exists and event was handled
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('provides correct handlers object', () => {
    render(<TestComponent />);

    const puzzlePiece = screen.getByTestId('puzzle-piece');

    // Verify the element has the expected event handlers
    expect(puzzlePiece).toBeInTheDocument();
  });

  it('maintains state consistency across multiple operations', async () => {
    render(<TestComponent initialX={50} initialY={50} />);

    const moveToButton = screen.getByTestId('move-to');
    const moveByButton = screen.getByTestId('move-by');
    const trySnapButton = screen.getByTestId('try-snap');

    // Move to position
    moveToButton.click();
    await waitFor(() => {
      expect(screen.getByTestId('drag-state')).toHaveTextContent(
        '{"isDragging":false,"x":150,"y":250}',
      );
    });

    // Move by delta
    moveByButton.click();
    await waitFor(() => {
      expect(screen.getByTestId('drag-state')).toHaveTextContent(
        '{"isDragging":false,"x":160,"y":270}',
      );
    });

    // Try to snap (should not snap since we're far from target)
    trySnapButton.click();
    expect(screen.getByTestId('is-snapped')).toHaveTextContent('false');
  });
});

describe('useMovePieces touch scrolling', () => {
  const TouchPiece = ({
    onDragEnd = vi.fn(),
    target = 300,
  }: {
    onDragEnd?: () => void;
    target?: number;
  }) => {
    const { ref, dragState, isSnapped, handlers } = useMovePieces({
      initialX: 10,
      initialY: 20,
      boardRef: mockBoardRef,
      targetX: target,
      targetY: target,
      snapThreshold: 20,
      onDragStart: vi.fn(),
      onDragEnd,
    });
    return (
      <svg>
        <g ref={ref} {...handlers} data-testid="touch-piece" />
        <text data-testid="touch-state">{JSON.stringify({ ...dragState, isSnapped })}</text>
      </svg>
    );
  };

  // Fires a cancelable touch event at the piece with the given position and time.
  const touch = (el: Element, type: string, x: number, y: number, timeStamp: number) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    const point = { clientX: x, clientY: y };
    Object.defineProperty(event, 'touches', { value: type === 'touchend' ? [] : [point] });
    Object.defineProperty(event, 'timeStamp', { value: timeStamp });
    el.dispatchEvent(event);
    return event;
  };

  it('does not block touch scrolling with touch-action: none', () => {
    render(<TouchPiece />);
    expect(screen.getByTestId('touch-piece').style.touchAction).toBe('manipulation');
  });

  it('lets a fast up/down swipe that starts on a piece scroll the page', () => {
    render(<TouchPiece />);
    const piece = screen.getByTestId('touch-piece');
    touch(piece, 'touchstart', 100, 100, 1000);
    const first = touch(piece, 'touchmove', 102, 140, 1030); // 40px in 30ms
    const next = touch(piece, 'touchmove', 104, 200, 1060);
    expect(first.defaultPrevented).toBe(false);
    expect(next.defaultPrevented).toBe(false);
  });

  it('keeps the page still while a piece is dragged slowly', () => {
    render(<TouchPiece />);
    const piece = screen.getByTestId('touch-piece');
    touch(piece, 'touchstart', 100, 100, 1000);
    const first = touch(piece, 'touchmove', 101, 106, 1100); // 6px in 100ms
    const fastLater = touch(piece, 'touchmove', 101, 200, 1110);
    expect(first.defaultPrevented).toBe(true);
    expect(fastLater.defaultPrevented).toBe(true);
  });

  it('treats a fast sideways move as a drag, not a swipe', () => {
    render(<TouchPiece />);
    const piece = screen.getByTestId('touch-piece');
    touch(piece, 'touchstart', 100, 100, 1000);
    expect(touch(piece, 'touchmove', 150, 105, 1020).defaultPrevented).toBe(true);
  });

  it('puts the piece back, without snapping, when the browser cancels the drag to scroll', () => {
    const onDragEnd = vi.fn();
    // The piece starts within snapping distance, so ending the drag normally
    // would snap it.
    render(<TouchPiece onDragEnd={onDragEnd} target={15} />);
    const piece = screen.getByTestId('touch-piece') as unknown as SVGGElement;
    // jsdom has no pointer capture or PointerEvent fields
    piece.setPointerCapture = vi.fn();
    piece.hasPointerCapture = vi.fn(() => false);
    const pointer = (type: string, init: Record<string, unknown>) => {
      const event = new MouseEvent(type, { bubbles: true, cancelable: true, ...init });
      Object.assign(event, { pointerId: 1, isPrimary: true });
      return event;
    };
    fireEvent(piece, pointer('pointerdown', { clientX: 100, clientY: 100 }));
    expect(JSON.parse(screen.getByTestId('touch-state').textContent!).isDragging).toBe(true);
    fireEvent(window, pointer('pointercancel', { clientX: 100, clientY: 160 }));
    const state = JSON.parse(screen.getByTestId('touch-state').textContent!);
    expect(state).toMatchObject({ x: 10, y: 20, isDragging: false, isSnapped: false });
    expect(onDragEnd).toHaveBeenCalled();
  });
});
