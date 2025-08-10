import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './styles.scss';
const PropField = ({ field, getValue, updateFormOption }) => {
    const indentClass = field.indent === 0 ? '' : `indent${field.indent}`;
    // Render opening/closing braces for JSON
    if (field.isBrace) {
        return (_jsxs("div", { className: `formGroup ${indentClass}`, children: [field.isKey && _jsx("span", { className: "key", children: field.label }), _jsx("span", { className: "brace", children: field.braceType === 'open' ? '{' : '}' })] }));
    }
    // Render checkbox input
    if (field.type === 'checkbox') {
        return (_jsxs("div", { className: `formGroup ${indentClass}`, children: [_jsx("label", { children: field.label }), _jsx("input", { type: "checkbox", checked: getValue(field.name), onChange: (e) => updateFormOption(field.name, e.target.checked) })] }));
    }
    // Render number input
    if (field.type === 'number') {
        const currentValue = getValue(field.name);
        return (_jsxs("div", { className: `formGroup ${indentClass}`, children: [_jsx("label", { children: field.label }), _jsx("input", { type: "number", value: currentValue === 0 ? '' : currentValue, placeholder: "number", onChange: (e) => {
                        const newValue = e.target.value;
                        const numericValue = newValue === '' ? 0 : Number(newValue);
                        updateFormOption(field.name, numericValue);
                    } })] }));
    }
    // Render text input
    return (_jsxs("div", { className: `formGroup ${indentClass}`, children: [_jsx("label", { children: field.label }), _jsx("input", { type: "text", value: getValue(field.name), placeholder: "string", onChange: (e) => updateFormOption(field.name, e.target.value) })] }));
};
export default PropField;
//# sourceMappingURL=index.js.map