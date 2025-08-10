import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import PropField from '../prop-fields';
import { FIELDS } from '../../constants';
import './styles.scss';
const PropOptionsWrapper = (props) => {
    const { handlePropsChange } = props;
    const [formValues, setFormValues] = useState(DEFAULT_PUZZLE_OPTIONS);
    const [isOpen, setIsOpen] = useState(false);
    // Update nested form values using dot notation (e.g., 'board.width')
    const updateField = (path, value) => {
        setFormValues((prev) => {
            const newValues = { ...prev };
            const keys = path.split('.');
            let current = newValues;
            // Navigate to the nested property
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            // Update the final property
            current[keys[keys.length - 1]] = value;
            return newValues;
        });
    };
    // Get nested form values using dot notation
    const getFieldValue = (path) => {
        const keys = path.split('.');
        let current = formValues;
        // Navigate to the nested property
        for (const key of keys) {
            current = current[key];
        }
        return current;
    };
    // Apply form changes to the puzzle and trigger re-render
    const handleApplyChanges = (e) => {
        e.preventDefault();
        // Add a timestamp to force re-render
        const optionsWithKey = {
            ...formValues,
            _key: Date.now(), // This will force React to treat it as a new object
        };
        handlePropsChange(optionsWithKey);
        setIsOpen(false); // Close the menu after applying
    };
    const formFields = FIELDS.map((field) => (_jsx(PropField, { field: field, getValue: getFieldValue, updateFormOption: updateField }, `${field.name}-${field.label}`)));
    return (_jsxs("div", { className: "propOptionsWrapper", children: [_jsx("button", { className: "propsToggleButton", onClick: () => setIsOpen(!isOpen), children: isOpen ? 'Close puzzle props' : 'Update puzzle props' }), isOpen && (_jsxs("div", { className: "propsMenu", children: [_jsx("div", { className: "formHeader", children: _jsx("p", { children: "Click on a value, then edit and apply." }) }), _jsx("div", { className: "jsonForm", children: formFields }), _jsx("button", { className: "applyButton", onClick: handleApplyChanges, children: "Apply changes" })] }))] }));
};
export default PropOptionsWrapper;
//# sourceMappingURL=index.js.map