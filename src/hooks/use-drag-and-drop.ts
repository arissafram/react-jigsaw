import { useRef, useState } from 'react';

interface DragState {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
}

export const useDragAndDrop = ({
  initialX,
  initialY,
  snapThreshold,
  svgRef,
  targetX,
  targetY,
  onSnap,
}: {
  initialX: number;
  initialY: number;
  snapThreshold: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  targetX: number;
  targetY: number;
  onSnap?: () => void;
}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    x: initialX,
    y: initialY,
  });
  const [isSnapped, setIsSnapped] = useState(false);
  const ref = useRef<SVGGElement | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (isSnapped) return;
    if (e.button !== 0) return; // Only left click
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    setDragState((s) => ({
      ...s,
      isDragging: true,
      offsetX: cursor.x - s.x,
      offsetY: cursor.y - s.y,
    }));
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e: PointerEvent) {
    setDragState((s) => {
      if (!s.isDragging) return s;
      const svg = svgRef.current;
      if (!svg) return s;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      return {
        ...s,
        x: cursor.x - s.offsetX,
        y: cursor.y - s.offsetY,
      };
    });
  }

  function onPointerUp() {
    setDragState((s) => {
      const dist = Math.hypot(s.x - targetX, s.y - targetY);
      if (dist <= snapThreshold) {
        setIsSnapped(true);
        onSnap?.();
        return { ...s, isDragging: false, x: targetX, y: targetY };
      }
      return { ...s, isDragging: false };
    });
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  function movePiece(deltaX: number, deltaY: number) {
    if (isSnapped) return;
    setDragState((s) => ({
      ...s,
      x: s.x + deltaX,
      y: s.y + deltaY,
    }));
  }

  function snapPiece() {
    if (isSnapped) return;
    const dist = Math.hypot(dragState.x - targetX, dragState.y - targetY);
    if (dist <= snapThreshold) {
      setIsSnapped(true);
      onSnap?.();
      setDragState((s) => ({
        ...s,
        x: targetX,
        y: targetY,
      }));
    }
  }

  return {
    ref,
    dragState,
    isSnapped,
    movePiece,
    snapPiece,
    eventHandlers: {
      onPointerDown: isSnapped ? undefined : onPointerDown,
      style: { cursor: isSnapped ? 'default' : 'grab' },
    },
  };
};
