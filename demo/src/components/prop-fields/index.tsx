import { Field } from '../../types';

import './styles.scss';

interface PropFieldProps {
  field: Field;
  getValue: (path: string) => string | number | boolean;
  updateFormOption: (path: string, value: string | number | boolean) => void;
}

const PropField = ({ field, getValue, updateFormOption }: PropFieldProps) => {
  // Generate CSS class for indentation level
  const indentClass = field.indent === 0 ? '' : `indent${field.indent}`;

  // Render opening/closing braces for JSON-like structure
  if (field.isBrace) {
    return (
      <div className={`formGroup ${indentClass}`}>
        {field.isKey && <span className="key">{field.label}</span>}
        <span className="brace">{field.braceType === 'open' ? '{' : '}'}</span>
      </div>
    );
  }

  // Render checkbox input
  if (field.type === 'checkbox') {
    return (
      <div className={`formGroup ${indentClass}`}>
        <label>{field.label}</label>
        <input
          type="checkbox"
          checked={getValue(field.name) as boolean}
          onChange={(e) => updateFormOption(field.name, e.target.checked)}
        />
      </div>
    );
  }

  // Render number input
  if (field.type === 'number') {
    const currentValue = getValue(field.name) as number;
    return (
      <div className={`formGroup ${indentClass}`}>
        <label>{field.label}</label>
        <input
          type="number"
          value={currentValue === 0 ? '' : currentValue}
          placeholder="number"
          onChange={(e) => {
            const newValue = e.target.value;
            const numericValue = newValue === '' ? 0 : Number(newValue);
            updateFormOption(field.name, numericValue);
          }}
        />
      </div>
    );
  }

  // Default: render text input
  return (
    <div className={`formGroup ${indentClass}`}>
      <label>{field.label}</label>
      <input
        type="text"
        value={getValue(field.name) as string}
        placeholder="string"
        onChange={(e) => updateFormOption(field.name, e.target.value)}
      />
    </div>
  );
};

export default PropField;
