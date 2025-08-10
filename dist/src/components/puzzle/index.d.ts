import { InitialPuzzleOptions } from '@/types';
interface PuzzleProps {
    image: string;
    options?: InitialPuzzleOptions;
    onComplete?: () => void;
    onRefresh?: () => void;
    responsive?: boolean;
}
declare const Puzzle: React.FC<PuzzleProps>;
export default Puzzle;
//# sourceMappingURL=index.d.ts.map