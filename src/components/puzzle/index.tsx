import styles from './styles.module.scss';
import Board from '../board';
import { PuzzleProvider } from '../../contexts/puzzle-context';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export interface PuzzleProps {
  columns: number;
  image: string;
  rows?: number;
  scramble?: boolean;
  showOutlines?: boolean;
}

const PuzzleContent: React.FC<PuzzleProps> = (props: PuzzleProps) => {
  const {
    columns = 5,
    image = DEFAULT_IMAGE,
    rows = 2,
    scramble = true,
    showOutlines = true,
  } = props;

  return (
    <div className={styles.puzzle}>
      <Board
        columns={columns}
        image={image}
        rows={rows}
        scramble={scramble}
        showOutlines={showOutlines}
      />
      <pre style={{ textAlign: 'left', background: '#f8f8f8', padding: '1rem', borderRadius: 8 }}>
        {JSON.stringify({ rows, columns, showOutlines, scramble, }, null, 2)}
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
