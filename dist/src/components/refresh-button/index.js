import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { STROKE_WIDTH } from '@/constants';
import styles from './styles.module.scss';
const RefreshButton = (props) => {
    const { className, onRefresh } = props;
    return (_jsx("button", { "data-testid": "refresh-button", className: `${styles.refreshButton} ${className}`, onClick: onRefresh, title: "Refresh puzzle", children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#000000", strokeWidth: STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), _jsx("path", { d: "M21 3v5h-5" }), _jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), _jsx("path", { d: "M3 21v-5h5" })] }) }));
};
export default RefreshButton;
//# sourceMappingURL=index.js.map