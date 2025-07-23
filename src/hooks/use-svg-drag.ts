import { useRef, useState, useCallback } from 'react';

interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
}

interface UseSvgDragOptions {
  initialX: number;
  initialY: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  targetX: number;
  targetY: number;
  snapThreshold: number;
  onSnap?: () => void;
}

export function useSvgDrag({
  initialX,
  initialY,
  svgRef,
  targetX,
  targetY,
  snapThreshold,
  onSnap,
}: UseSvgDragOptions) {
  const elementRef = useRef<SVGGElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    x: initialX,
    y: initialY,
  });
  const [isSnapped, setIsSnapped] = useState(false);

  // Store drag info in ref to avoid stale closures
  const dragInfoRef = useRef<{
    offsetX: number;
    offsetY: number;
    pointerId: number;
    isDragging: boolean;
  } | null>(null);

  // Convert screen coordinates to SVG coordinates
  const screenToSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: clientX, y: clientY };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgCoords = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      return { x: svgCoords.x, y: svgCoords.y };
    },
    [svgRef],
  );

  // Check if should snap to target
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

  // Global pointermove/pointerup/pointercancel handlers
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      if (!dragInfo || !dragInfo.isDragging || e.pointerId !== dragInfo.pointerId) return;
      const svgCoords = screenToSvgCoords(e.clientX, e.clientY);
      const newX = svgCoords.x - dragInfo.offsetX;
      const newY = svgCoords.y - dragInfo.offsetY;
      setDragState((prev) => ({ ...prev, x: newX, y: newY }));
      e.preventDefault();
    },
    [screenToSvgCoords],
  );

  const endDrag = useCallback(
    (e: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      if (!dragInfo || !dragInfo.isDragging || e.pointerId !== dragInfo.pointerId) return;
      dragInfo.isDragging = false;
      // Remove listeners
      window.removeEventListener('pointermove', handlePointerMove);
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

      if (!checkSnap(finalX, finalY)) {
        setDragState((prev) => ({ ...prev, isDragging: false }));
      }
      e.preventDefault();
    },
    [screenToSvgCoords, checkSnap],
  );

  // Pointer event handlers for the element
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<SVGGElement>) => {
      if (isSnapped) return;
      if (!event.isPrimary) return;
      const element = elementRef.current;
      if (!element) return;
      const svgCoords = screenToSvgCoords(event.clientX, event.clientY);
      const offsetX = svgCoords.x - dragState.x;
      const offsetY = svgCoords.y - dragState.y;

      dragInfoRef.current = {
        offsetX,
        offsetY,
        pointerId: event.pointerId,
        isDragging: true,
      };

      element.setPointerCapture(event.pointerId);

      window.addEventListener('pointermove', handlePointerMove, { passive: false });
      window.addEventListener('pointerup', endDrag, { passive: false });
      window.addEventListener('pointercancel', endDrag, { passive: false });

      setDragState((prev) => ({ ...prev, isDragging: true }));
      event.preventDefault();
    },
    [isSnapped, dragState.x, dragState.y, screenToSvgCoords, handlePointerMove, endDrag],
  );

  // Element handlers - mostly just prevent defaults now
  const handlePointerMoveElement = useCallback((event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
  }, []);

  const handlePointerUpElement = useCallback((event: React.PointerEvent<SVGGElement>) => {
    event.preventDefault();
  }, []);

  const handlePointerCancel = useCallback(
    (event: React.PointerEvent<SVGGElement>) => {
      endDrag(event.nativeEvent as PointerEvent);
    },
    [endDrag],
  );

  // Programmatic movement (for keyboard controls, etc.)
  const moveTo = useCallback(
    (x: number, y: number) => {
      if (isSnapped) return;
      setDragState((prev) => ({ ...prev, x, y }));
    },
    [isSnapped],
  );

  const moveBy = useCallback(
    (deltaX: number, deltaY: number) => {
      if (isSnapped) return;
      setDragState((prev) => ({ ...prev, x: prev.x + deltaX, y: prev.y + deltaY }));
    },
    [isSnapped],
  );

  const trySnap = useCallback(() => {
    if (isSnapped) return;
    checkSnap(dragState.x, dragState.y);
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
        touchAction: 'none',
        cursor: isSnapped ? 'default' : dragState.isDragging ? 'grabbing' : 'grab',
      } as React.CSSProperties,
    },
  };
}
