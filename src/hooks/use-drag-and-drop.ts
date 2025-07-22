import { useRef, useState } from 'react';

interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

export const useDragAndDrop = ({
  initialX,
  initialY,
  targetX,
  targetY,
  snapThreshold,
  svgRef,
}: {
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  snapThreshold: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    x: initialX,
    y: initialY,
    offsetX: 0,
    offsetY: 0,
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
        return { ...s, isDragging: false, x: targetX, y: targetY };
      }
      return { ...s, isDragging: false };
    });
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  return {
    ref,
    dragState,
    isSnapped,
    eventHandlers: {
      onPointerDown: isSnapped ? undefined : onPointerDown,
      style: { cursor: isSnapped ? 'default' : 'grab' },
    },
  };
};
