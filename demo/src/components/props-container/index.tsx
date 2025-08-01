import { useState } from 'react';

import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { PuzzleOptions } from '@/types';

import PropField from '../prop-fields';
import { FIELDS } from '../../constants';

import './styles.scss';

interface PropsContainerProps {
  handlePropsChange: (options: PuzzleOptions) => void;
}

const PropsContainer = (props: PropsContainerProps) => {
  const { handlePropsChange } = props;
  const [formValues, setFormValues] = useState<PuzzleOptions>(DEFAULT_PUZZLE_OPTIONS);

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

  // Apply form changes to the puzzle
  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    handlePropsChange(formValues);
  };

  // Render form fields from the FIELDS configuration
  const formFields = FIELDS.map((field) => (
    <PropField
      key={field.name}
      field={field}
      getValue={getFieldValue}
      updateFormOption={updateField}
    />
  ));

  return (
    <div className="propsForm">
      <div className="formHeader">
        <h3>Puzzle Props</h3>
        <button className="applyButton" onClick={handleApplyChanges}>
          Apply Changes
        </button>
      </div>
      <div className="jsonForm">{formFields}</div>
    </div>
  );
};

export default PropsContainer;
