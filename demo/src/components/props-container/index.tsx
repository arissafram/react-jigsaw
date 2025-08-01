import { useState } from 'react';

import { PuzzleOptions } from '@/types';

import PropField from '../prop-fields';
import { FIELDS } from '../../constants';

import './styles.scss';

interface PropsContainerProps {
  handlePropsChange: (options: PuzzleOptions) => void;
}

// Use the same default options as the puzzle to ensure consistency
const DEMO_DEFAULT_OPTIONS: PuzzleOptions = {
  board: {
    columns: 4,
    rows: 5,
    width: 800,
    height: 500,
    className: '',
    scatterArea: 0,
    showBoardSlotOutlines: true,
    snapThreshold: 20,
  },
  puzzle: {
    responsive: false,
    className: '',
    timer: { enabled: true, className: '' },
    refreshButton: { enabled: true, className: '' },
    rowsAndColumns: { enabled: true, className: '' },
  },
  puzzlePiece: { strokeColor: '#000000', strokeEnabled: true },
  onComplete: () => {},
  onRefresh: () => {},
};

const PropsContainer = (props: PropsContainerProps) => {
  const { handlePropsChange } = props;
  const [formValues, setFormValues] = useState<PuzzleOptions>(DEMO_DEFAULT_OPTIONS);
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
    <div className="propsContainer">
      <button className="propsToggleButton" onClick={() => setIsOpen(!isOpen)}>
        Puzzle Props
      </button>

      {isOpen && (
        <div className="propsMenu">
          <div className="formHeader">
            <p>Click on a property to modify it, then click apply</p>
          </div>
          <div className="jsonForm">{formFields}</div>
          <button className="applyButton" onClick={handleApplyChanges}>
            Apply Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default PropsContainer;
