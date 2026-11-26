import { useRef, useState, useCallback, useEffect } from 'react';
import { BoardRef } from '@/types';

interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
}

// A touch that starts on a piece and moves up or down at least this fast
// (px/ms, measured at its first touchmove) is a swipe to scroll the page, not
// a drag. Slower or sideways touches pick the piece up.
const SWIPE_SPEED = 0.5;

interface UseMovePiecesOptions {
  initialX: number;
  initialY: number;
  boardRef: BoardRef;
  targetX: number;
  targetY: number;
  snapThreshold: number;
  onSnap?: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

/**
 * Custom React hook for enabling SVG-based drag-and-drop movement and snapping for puzzle pieces.
 *
 * Handles pointer events, keyboard movement, and snapping logic for a single puzzle piece.
 * Converts screen coordinates to SVG coordinates, manages drag state, and ensures pieces snap to their targets.
 * Returns refs, state, and event handlers for use in a puzzle piece component.
 *
 * Usage:
 *   const { ref, dragState, isSnapped, moveTo, moveBy, trySnap, handlers } = useMovePieces(...);
 *   <g ref={ref} {...handlers} ... />
 */
export function useMovePieces({
  initialX,
  initialY,
  boardRef,
  targetX,
  targetY,
  snapThreshold,
  onSnap,
  onDragStart,
  onDragEnd,
}: UseMovePiecesOptions) {
  // Ref to the SVG group element representing the piece
  const elementRef = useRef<SVGGElement>(null);

  // State for tracking drag position and whether the piece is being dragged
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    x: initialX,
    y: initialY,
  });
  // State for whether the piece is snapped to its target
  const [isSnapped, setIsSnapped] = useState(false);

  // Store drag info in a ref to avoid stale closures during pointer events
  const dragInfoRef = useRef<{
    offsetX: number;
    offsetY: number;
    pointerId: number;
    isDragging: boolean;
    // Where the piece was when the drag began, to put it back on cancel
    startX: number;
    startY: number;
  } | null>(null);

  // Store the handlePointerMove function in a ref to avoid circular dependencies
  const handlePointerMoveRef = useRef<((e: PointerEvent) => void) | null>(null);

  // Convert screen (client) coordinates to SVG coordinates for accurate dragging
  const screenToSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const board = boardRef.current;
      if (!board) return { x: clientX, y: clientY };
      const pt = board.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgCoords = pt.matrixTransform(board.getScreenCTM()?.inverse());
      return { x: svgCoords.x, y: svgCoords.y };
    },
    [boardRef],
  );

  // Check if the piece should snap to its target position
  const checkSnap = useCallback(
    (x: number, y: number) => {
      const distance = Math.hypot(x - targetX, y - targetY);
      if (distance <= snapThreshold) {
        setIsSnapped(true);
        setDragState((prev) => ({ ...prev, x: targetX, y: targetY, isDragging: false }));
        onSnap?.();
        return true;
      }
      return false;
    },
    [targetX, targetY, snapThreshold, onSnap],
  );

  // Global pointermove/pointerup/pointercancel handlers for drag events
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      if (!dragInfo || !dragInfo.isDragging || e.pointerId !== dragInfo.pointerId) return;
      // Convert pointer position to SVG coordinates
      const svgCoords = screenToSvgCoords(e.clientX, e.clientY);
      // Calculate new position relative to drag start
      const newX = svgCoords.x - dragInfo.offsetX;
      const newY = svgCoords.y - dragInfo.offsetY;
      setDragState((prev) => ({ ...prev, x: newX, y: newY }));
      e.preventDefault();
    },
    [screenToSvgCoords],
  );

  // Store the handlePointerMove function in the ref
  handlePointerMoveRef.current = handlePointerMove;

  // End drag, check for snapping, and clean up event listeners
  const endDrag = useCallback(
    (e: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      if (!dragInfo || !dragInfo.isDragging || e.pointerId !== dragInfo.pointerId) return;
      dragInfo.isDragging = false;
      // Remove global event listeners
      if (handlePointerMoveRef.current) {
        window.removeEventListener('pointermove', handlePointerMoveRef.current);
      }
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);

      // Release pointer capture if possible
      const element = elementRef.current;
      if (element && element.hasPointerCapture(e.pointerId)) {
        element.releasePointerCapture(e.pointerId);
      }

      // Get final position for snap check
      const svgCoords = screenToSvgCoords(e.clientX, e.clientY);
      const finalX = svgCoords.x - dragInfo.offsetX;
      const finalY = svgCoords.y - dragInfo.offsetY;

      dragInfoRef.current = null;

      if (e.type === 'pointercancel') {
        // The browser took the touch (e.g. to scroll): put the piece back.
        setDragState((prev) => ({
          ...prev,
          x: dragInfo.startX,
          y: dragInfo.startY,
          isDragging: false,
        }));
      } else if (!checkSnap(finalX, finalY)) {
        // Snap if close enough, otherwise just end drag
        setDragState((prev) => ({ ...prev, isDragging: false }));
      }

      // Notify drag end
      onDragEnd();

      e.preventDefault();
    },
    [screenToSvgCoords, checkSnap, onDragEnd],
  );

  // Pointer down handler for starting drag
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<SVGGElement>) => {
      if (isSnapped) return;
      if (!event.isPrimary) return;
      const element = elementRef.current;
      if (!element) return;
      // Convert pointer position to SVG coordinates
      const svgCoords = screenToSvgCoords(event.clientX, event.clientY);
      // Calculate offset from pointer to piece origin
      const offsetX = svgCoords.x - dragState.x;
      const offsetY = svgCoords.y - dragState.y;

      // Store drag info for use in global handlers
      dragInfoRef.current = {
        offsetX,
        offsetY,
        pointerId: event.pointerId,
        isDragging: true,
        startX: dragState.x,
        startY: dragState.y,
      };

      // Capture pointer events for this element
      element.setPointerCapture(event.pointerId);

      // Add global event listeners for drag
      if (handlePointerMoveRef.current) {
        window.addEventListener('pointermove', handlePointerMoveRef.current, { passive: false });
      }
      window.addEventListener('pointerup', endDrag, { passive: false });
      window.addEventListener('pointercancel', endDrag, { passive: false });

      setDragState((prev) => ({ ...prev, isDragging: true }));

      // Notify drag start
      onDragStart();

      event.preventDefault();
    },
    [isSnapped, dragState.x, dragState.y, screenToSvgCoords, endDrag, onDragStart],
  );

  // Prevent default behavior for pointer move/up/cancel on the element
  const handlePointerMoveElement = useCallback((event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
  }, []);

  const handlePointerUpElement = useCallback((event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
  }, []);

  // Handle pointer cancel by ending drag
  const handlePointerCancel = useCallback(
    (event: React.PointerEvent<SVGGElement>) => {
      endDrag(event.nativeEvent as PointerEvent);
    },
    [endDrag],
  );

  // Touch: pieces don't set `touch-action: none`, so a touch anywhere else on
  // the page scrolls as usual. On a piece, the first touchmove decides: a fast
  // up/down swipe is left to the browser (it scrolls and cancels the drag,
  // which puts the piece back); anything else is a drag, and its touchmoves
  // are cancelled so the page stays still.
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    let start: { x: number; y: number; time: number } | null = null;
    let isDrag = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        start = null;
        return;
      }
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY, time: e.timeStamp };
      isDrag = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!start) return;
      if (!isDrag) {
        const t = e.touches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        const speed = Math.hypot(dx, dy) / Math.max(e.timeStamp - start.time, 1);
        if (Math.abs(dy) > Math.abs(dx) && speed >= SWIPE_SPEED) {
          start = null;
          return;
        }
        isDrag = true;
      }
      if (e.cancelable) e.preventDefault();
    };

    const onTouchEnd = () => {
      start = null;
      isDrag = false;
    };

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: false });
    element.addEventListener('touchend', onTouchEnd);
    element.addEventListener('touchcancel', onTouchEnd);
    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
      element.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Programmatic movement (for keyboard controls, etc.)
  const moveTo = useCallback(
    (x: number, y: number) => {
      if (isSnapped) return;
      setDragState((prev) => ({ ...prev, x, y }));
    },
    [isSnapped],
  );

  // Move by a delta (for keyboard arrow keys)
  const moveBy = useCallback(
    (deltaX: number, deltaY: number) => {
      if (isSnapped) return;
      setDragState((prev) => ({ ...prev, x: prev.x + deltaX, y: prev.y + deltaY }));
    },
    [isSnapped],
  );

  // Try to snap to the target position (for keyboard Enter/Space)
  const trySnap = useCallback(() => {
    if (isSnapped) return false;
    return checkSnap(dragState.x, dragState.y);
  }, [isSnapped, dragState.x, dragState.y, checkSnap]);

  return {
    ref: elementRef,
    dragState,
    isSnapped,
    moveTo,
    moveBy,
    trySnap,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMoveElement,
      onPointerUp: handlePointerUpElement,
      onPointerCancel: handlePointerCancel,
      style: {
        // Not 'none': see the touch handling above.
        touchAction: 'manipulation',
        cursor: isSnapped ? 'default' : dragState.isDragging ? 'grabbing' : 'grab',
      } as React.CSSProperties,
    },
  };
}
