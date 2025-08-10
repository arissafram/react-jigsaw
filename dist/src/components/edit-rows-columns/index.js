import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
const EditRowsColumns = (props) => {
    const { className, currentColumns, currentRows, onBoardSlotChange } = props;
    const [rows, setRows] = useState(currentRows.toString());
    const [columns, setColumns] = useState(currentColumns.toString());
    // Check if values have changed from current
    const hasChanged = parseInt(rows) !== currentRows || parseInt(columns) !== currentColumns;
    // Check if values are valid (2-10 range)
    const rowsValid = parseInt(rows) >= 2 && parseInt(rows) <= 10;
    const columnsValid = parseInt(columns) >= 2 && parseInt(columns) <= 10;
    const isValid = rowsValid && columnsValid && hasChanged;
    // Update local state when props change
    useEffect(() => {
        setRows(currentRows.toString());
        setColumns(currentColumns.toString());
    }, [currentRows, currentColumns]);
    const handleRowsChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
            setRows(value);
        }
    };
    const handleColumnsChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
            setColumns(value);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            // Save to localStorage
            localStorage.setItem('react-jigsaw', JSON.stringify({
                rows: parseFloat(rows),
                columns: parseFloat(columns),
            }));
            onBoardSlotChange(parseInt(rows), parseInt(columns));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { "data-testid": "edit-rows-columns", className: `${styles.editRowsColumns} ${className}`, onSubmit: handleSubmit, children: [_jsxs("label", { children: ["Rows:", _jsx("input", { type: "text", value: rows, onChange: handleRowsChange, placeholder: "2-10" })] }), _jsxs("label", { children: ["Cols:", _jsx("input", { type: "text", value: columns, onChange: handleColumnsChange, placeholder: "2-10" })] }), _jsx("input", { type: "submit", value: "Ok", disabled: !isValid })] }), _jsx("span", { className: styles.inlineNote, children: "(Valid numbers: 2-10)" })] }));
};
export default EditRowsColumns;
//# sourceMappingURL=index.js.map