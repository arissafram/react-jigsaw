import { useRef } from 'react';
import { useSvgDrag } from '@/hooks/use-svg-drag';
import styles from './styles.module.scss';

const TestComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create three draggable circles with different colors and targets
  const piece1 = useSvgDrag({
    initialX: 50,
    initialY: 50,
    svgRef,
    targetX: 300,
    targetY: 100,
    snapThreshold: 30,
    onSnap: () => alert('Red circle snapped!'),
  });

  const piece2 = useSvgDrag({
    initialX: 50,
    initialY: 150,
    svgRef,
    targetX: 300,
    targetY: 200,
    snapThreshold: 30,
    onSnap: () => alert('Blue circle snapped!'),
  });

  const piece3 = useSvgDrag({
    initialX: 50,
    initialY: 250,
    svgRef,
    targetX: 300,
    targetY: 300,
    snapThreshold: 30,
    onSnap: () => alert('Green circle snapped!'),
  });

  return (
    <div className={styles.container}>
      <h2>SVG Drag Test</h2>
      <p>Drag the colored circles to their matching target areas on the right!</p>

      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox="0 0 500 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Target areas (where pieces should be dragged to) */}
        <g className={styles.targets}>
          <circle cx={300} cy={100} r={25} fill="#ffcccc" stroke="#ff0000" strokeWidth={2} />
          <text x={300} y={105} textAnchor="middle" className={styles.targetText}>
            Red Target
          </text>

          <circle cx={300} cy={200} r={25} fill="#ccccff" stroke="#0000ff" strokeWidth={2} />
          <text x={300} y={205} textAnchor="middle" className={styles.targetText}>
            Blue Target
          </text>

          <circle cx={300} cy={300} r={25} fill="#ccffcc" stroke="#00ff00" strokeWidth={2} />
          <text x={300} y={305} textAnchor="middle" className={styles.targetText}>
            Green Target
          </text>
        </g>

        {/* Draggable pieces */}
        <g
          ref={piece1.ref}
          {...piece1.handlers}
          transform={`translate(${piece1.dragState.x}, ${piece1.dragState.y})`}
          className={`${styles.piece} ${piece1.isSnapped ? styles.snapped : ''}`}
        >
          <circle cx={0} cy={0} r={20} fill="#ff4444" stroke="#cc0000" strokeWidth={2} />
          <text x={0} y={5} textAnchor="middle" className={styles.pieceText}>
            Red
          </text>
        </g>

        <g
          ref={piece2.ref}
          {...piece2.handlers}
          transform={`translate(${piece2.dragState.x}, ${piece2.dragState.y})`}
          className={`${styles.piece} ${piece2.isSnapped ? styles.snapped : ''}`}
        >
          <circle cx={0} cy={0} r={20} fill="#4444ff" stroke="#0000cc" strokeWidth={2} />
          <text x={0} y={5} textAnchor="middle" className={styles.pieceText}>
            Blue
          </text>
        </g>

        <g
          ref={piece3.ref}
          {...piece3.handlers}
          transform={`translate(${piece3.dragState.x}, ${piece3.dragState.y})`}
          className={`${styles.piece} ${piece3.isSnapped ? styles.snapped : ''}`}
        >
          <circle cx={0} cy={0} r={20} fill="#44ff44" stroke="#00cc00" strokeWidth={2} />
          <text x={0} y={5} textAnchor="middle" className={styles.pieceText}>
            Green
          </text>
        </g>

        {/* Instructions */}
        <text x={250} y={30} textAnchor="middle" className={styles.title}>
          Drag & Drop Test
        </text>
        <text x={250} y={50} textAnchor="middle" className={styles.subtitle}>
          Works with mouse, touch, and pen!
        </text>
      </svg>

      {/* Status display */}
      <div className={styles.status}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Red:</span>
          <span className={piece1.isSnapped ? styles.snappedText : styles.activeText}>
            {piece1.isSnapped ? 'Snapped!' : piece1.dragState.isDragging ? 'Dragging...' : 'Ready'}
          </span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Blue:</span>
          <span className={piece2.isSnapped ? styles.snappedText : styles.activeText}>
            {piece2.isSnapped ? 'Snapped!' : piece2.dragState.isDragging ? 'Dragging...' : 'Ready'}
          </span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Green:</span>
          <span className={piece3.isSnapped ? styles.snappedText : styles.activeText}>
            {piece3.isSnapped ? 'Snapped!' : piece3.dragState.isDragging ? 'Dragging...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Test buttons for programmatic control */}
      <div className={styles.controls}>
        <h3>Programmatic Controls:</h3>
        <button onClick={() => piece1.moveBy(10, 0)} disabled={piece1.isSnapped}>
          Move Red Right
        </button>
        <button onClick={() => piece2.moveBy(0, 10)} disabled={piece2.isSnapped}>
          Move Blue Down
        </button>
        <button onClick={() => piece3.moveTo(100, 100)} disabled={piece3.isSnapped}>
          Move Green to (100,100)
        </button>
        <button onClick={() => piece1.trySnap()} disabled={piece1.isSnapped}>
          Try Snap Red
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
