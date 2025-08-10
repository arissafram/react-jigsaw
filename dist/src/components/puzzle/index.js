import { jsx as _jsx } from "react/jsx-runtime";
import { PuzzleProvider } from '@/contexts/puzzle-context';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { mergeOptions } from './helpers/merge-options';
import PuzzleContent from './components/puzzle-content';
const Puzzle = (props) => {
    const { options } = props;
    const mergedOptions = mergeOptions(DEFAULT_PUZZLE_OPTIONS, options);
    return (_jsx(PuzzleProvider, { checkLocalStorage: mergedOptions.checkLocalStorage, columns: mergedOptions.board.columns, rows: mergedOptions.board.rows, children: _jsx(PuzzleContent, { ...props, options: mergedOptions }) }));
};
export default Puzzle;
//# sourceMappingURL=index.js.map