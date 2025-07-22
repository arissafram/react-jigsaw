import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider, usePuzzleContext } from '../../contexts/puzzle-context';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export interface PuzzleProps {
  image?: string;
  rows?: number;
  columns?: number;
  aspectRatio?: string; // e.g. '4x6'
  showOutlines?: boolean;
  onComplete?: () => void;
  scramble?: boolean;
  pieceSize?: 's' | 'm' | 'l';
}

const PuzzleContent: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const {
    image = DEFAULT_IMAGE,
    rows = 2,
    columns = 5,
    aspectRatio = '4x6',
    showOutlines = true,
    onComplete = () => console.log('complete'),
    scramble = true,
    pieceSize = 's',
  } = props;
  const { numPieces } = usePuzzleContext();

  return (
    <div className={styles.puzzle}>
      <Board
        numPieces={numPieces}
        image={image}
        rows={rows}
        columns={columns}
        aspectRatio={aspectRatio}
        showOutlines={showOutlines}
        scramble={scramble}
        pieceSize={pieceSize}
      />
      <pre style={{ textAlign: 'left', background: '#f8f8f8', padding: '1rem', borderRadius: 8 }}>
        {JSON.stringify({ rows, columns, aspectRatio, showOutlines, scramble, pieceSize }, null, 2)}
      </pre>
    </div>
  );
};

const Puzzle: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const { rows = 5, columns = 4 } = props;

  return (
    <PuzzleProvider rows={rows} columns={columns}>
      <PuzzleContent {...props} />
    </PuzzleProvider>
  );
};

export default Puzzle;
