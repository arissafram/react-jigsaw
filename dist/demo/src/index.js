import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Puzzle from '@/components/puzzle';
import PropOptionsWrapper from './components/props-options-wrapper';
import './styles.scss';
const DEMO_IMAGE = 'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const DEMO_IMAGE_2 = 'https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_H.jpg?auto=webp&width=3840&quality=75&fit=cover';
const App = () => {
    const [imageSource, setImageSource] = useState(DEMO_IMAGE);
    const [options, setOptions] = useState(undefined);
    const [puzzleKey, setPuzzleKey] = useState(0);
    const handleRefresh = () => {
        // TODO: use a random image generator
        setImageSource(DEMO_IMAGE_2);
    };
    const handlePropsChange = (newOptions) => {
        setOptions(newOptions);
        // Force re-render by updating the key
        setPuzzleKey((prev) => prev + 1);
    };
    return (_jsxs("div", { className: "puzzleWrapper", children: [_jsx("h1", { className: "header", children: "React Jigsaw Demo" }), _jsxs("div", { className: "puzzleContainer", children: [_jsx(Puzzle, { image: imageSource, onRefresh: handleRefresh, options: options }, puzzleKey), _jsx(PropOptionsWrapper, { handlePropsChange: handlePropsChange })] })] }));
};
export default App;
//# sourceMappingURL=index.js.map