import { useRef, useState } from 'react';

export interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

export function useDraggablePiece(initialX: number, initialY: number) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    x: initialX,
    y: initialY,
    offsetX: 0,
    offsetY: 0,
  });
  const ref = useRef<SVGGElement | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return; // Only left click
    const svg = ref.current?.ownerSVGElement;
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
      const svg = ref.current?.ownerSVGElement;
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
    setDragState((s) => ({ ...s, isDragging: false }));
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  return {
    ref,
    dragState,
    eventHandlers: {
      onPointerDown,
      style: { cursor: 'grab' },
    },
  };
} 