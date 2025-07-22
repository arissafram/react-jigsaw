import { generateJigsawPath, JigsawPathOptions } from '@/utils/generate-jigsaw-path';

interface GridOutlinesProps {
  columns: number;
  jigawOptions: JigsawPathOptions;
  rows: number;
  showGridOutlines: boolean;
}

const GridOutlines = (props: GridOutlinesProps) => {
  const { columns, jigawOptions, rows, showGridOutlines } = props;

  if (!showGridOutlines) return null;

  return Array.from({ length: rows }).map((_, row) =>
    Array.from({ length: columns }).map((_, col) => (
      <path
        key={`outline-${row}-${col}`}
        d={generateJigsawPath({ row, col, options: jigawOptions })}
        fill="none"
        stroke="#bbb"
        strokeWidth={2}
        style={{ pointerEvents: 'none' }}
      />
    )),
  );
};

export default GridOutlines;
