import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditRowsColumns from './index';

describe('EditRowsColumns', () => {
  const defaultProps = {
    currentRows: 4,
    currentColumns: 5,
    onBoardSlotChange: () => {},
    dataTestId: 'edit-rows-columns',
  };

  it('renders without crashing', () => {
    render(<EditRowsColumns {...defaultProps} />);
    expect(screen.getByTestId('edit-rows-columns')).toBeInTheDocument();
  });

  it('displays current rows and columns values', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const rowsInput = screen.getByDisplayValue('4');
    const columnsInput = screen.getByDisplayValue('5');

    expect(rowsInput).toBeInTheDocument();
    expect(columnsInput).toBeInTheDocument();
  });

  it('only accepts numeric input for rows', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const rowsInput = screen.getByDisplayValue('4');

    // Try to enter non-numeric characters
    fireEvent.change(rowsInput, { target: { value: 'abc' } });
    expect(rowsInput).toHaveValue('4'); // Should not change

    // Try to enter numbers
    fireEvent.change(rowsInput, { target: { value: '6' } });
    expect(rowsInput).toHaveValue('6'); // Should change
  });

  it('only accepts numeric input for columns', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const columnsInput = screen.getByDisplayValue('5');

    // Try to enter non-numeric characters
    fireEvent.change(columnsInput, { target: { value: 'xyz' } });
    expect(columnsInput).toHaveValue('5'); // Should not change

    // Try to enter numbers
    fireEvent.change(columnsInput, { target: { value: '7' } });
    expect(columnsInput).toHaveValue('7'); // Should change
  });

  it('disables submit button when values are invalid (less than 2)', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const rowsInput = screen.getByDisplayValue('4');
    const submitButton = screen.getByDisplayValue('Ok');

    // Change rows to 1 (invalid)
    fireEvent.change(rowsInput, { target: { value: '1' } });
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when values are invalid (greater than 10)', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const columnsInput = screen.getByDisplayValue('5');
    const submitButton = screen.getByDisplayValue('Ok');

    // Change columns to 11 (invalid)
    fireEvent.change(columnsInput, { target: { value: '11' } });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when values are valid (2-10 range)', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const rowsInput = screen.getByDisplayValue('4');
    const columnsInput = screen.getByDisplayValue('5');
    const submitButton = screen.getByDisplayValue('Ok');

    // Initially should be disabled (no changes)
    expect(submitButton).toBeDisabled();

    // Change to valid values
    fireEvent.change(rowsInput, { target: { value: '6' } });
    fireEvent.change(columnsInput, { target: { value: '8' } });

    expect(submitButton).toBeEnabled();
  });

  it('enables submit button when values are at the boundary (2 and 10)', () => {
    render(<EditRowsColumns {...defaultProps} />);

    const rowsInput = screen.getByDisplayValue('4');
    const columnsInput = screen.getByDisplayValue('5');
    const submitButton = screen.getByDisplayValue('Ok');

    // Change to boundary values
    fireEvent.change(rowsInput, { target: { value: '2' } });
    fireEvent.change(columnsInput, { target: { value: '10' } });

    expect(submitButton).toBeEnabled();
  });

  it('calls onBoardSlotChange when form is submitted with valid values', () => {
    const mockOnBoardSlotChange = vi.fn();
    render(<EditRowsColumns {...defaultProps} onBoardSlotChange={mockOnBoardSlotChange} />);

    const rowsInput = screen.getByDisplayValue('4');
    const columnsInput = screen.getByDisplayValue('5');
    const submitButton = screen.getByDisplayValue('Ok');

    // Change to valid values
    fireEvent.change(rowsInput, { target: { value: '6' } });
    fireEvent.change(columnsInput, { target: { value: '8' } });

    // Submit the form
    fireEvent.click(submitButton);

    expect(mockOnBoardSlotChange).toHaveBeenCalledWith(6, 8);
  });
});
