import { BoardRef } from '@/types';
interface DragState {
    isDragging: boolean;
    x: number;
    y: number;
}
interface UseMovePiecesOptions {
    initialX: number;
    initialY: number;
    boardRef: BoardRef;
    targetX: number;
    targetY: number;
    snapThreshold: number;
    onSnap?: () => void;
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
export declare function useMovePieces({ initialX, initialY, boardRef, targetX, targetY, snapThreshold, onSnap, }: UseMovePiecesOptions): {
    ref: import("react").RefObject<SVGGElement | null>;
    dragState: DragState;
    isSnapped: boolean;
    moveTo: (x: number, y: number) => void;
    moveBy: (deltaX: number, deltaY: number) => void;
    trySnap: () => boolean;
    handlers: {
        onPointerDown: (event: React.PointerEvent<SVGGElement>) => void;
        onPointerMove: (event: React.PointerEvent<SVGGElement>) => void;
        onPointerUp: (event: React.PointerEvent<SVGGElement>) => void;
        onPointerCancel: (event: React.PointerEvent<SVGGElement>) => void;
        style: React.CSSProperties;
    };
};
export {};
//# sourceMappingURL=use-move-pieces.d.ts.map