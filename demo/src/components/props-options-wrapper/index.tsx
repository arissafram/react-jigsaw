import { useState } from 'react';

import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleOptions } from '@/types';

import PropField from '../prop-fields';
import { FIELDS } from '../../constants';

import './styles.scss';

interface PropOptionsWrapperProps {
  handlePropsChange: (options: PuzzleOptions) => void;
}

const PropOptionsWrapper = (props: PropOptionsWrapperProps) => {
  const { handlePropsChange } = props;
  const [formValues, setFormValues] = useState<PuzzleOptions>(DEFAULT_PUZZLE_OPTIONS);
  const [isOpen, setIsOpen] = useState(false);

  // Update nested form values using dot notation (e.g., 'board.width')
  const updateField = (path: string, value: string | number | boolean) => {
    setFormValues((prev) => {
      const newValues = { ...prev };
      const keys = path.split('.');
      let current: Record<string, unknown> = newValues;

      // Navigate to the nested property
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }

      // Update the final property
      (current as Record<string, unknown>)[keys[keys.length - 1]] = value;
      return newValues;
    });
  };

  // Get nested form values using dot notation
  const getFieldValue = (path: string): string | number | boolean => {
    const keys = path.split('.');
    let current: unknown = formValues;

    // Navigate to the nested property
    for (const key of keys) {
      current = (current as Record<string, unknown>)[key];
    }

    return current as string | number | boolean;
  };

  // Apply form changes to the puzzle and trigger re-render
  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Add a timestamp to force re-render
    const optionsWithKey = {
      ...formValues,
      _key: Date.now(), // This will force React to treat it as a new object
    };
    handlePropsChange(optionsWithKey);
    setIsOpen(false); // Close the menu after applying
  };

  const formFields = FIELDS.map((field) => (
    <PropField
      key={`${field.name}-${field.label}`}
      field={field}
      getValue={getFieldValue}
      updateFormOption={updateField}
    />
  ));

  return (
    <div className="propOptionsWrapper">
      <button className="propsToggleButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close puzzle props' : 'Update puzzle props'}
      </button>
      {isOpen && (
        <div className="propsMenu">
          <div className="formHeader">
            <p>Click on a value, then edit and apply.</p>
          </div>
          <div className="jsonForm">{formFields}</div>
          <button className="applyButton" onClick={handleApplyChanges}>
            Apply changes
          </button>
        </div>
      )}
    </div>
  );
};

export default PropOptionsWrapper;
