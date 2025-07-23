import { FC, useState, useEffect } from 'react';

interface RowsColumnsProps {
  currentRows: number;
  currentColumns: number;
  onGridChange: (rows: number, columns: number) => void;
}

export const RowsColumns: FC<RowsColumnsProps> = ({
  currentRows,
  currentColumns,
  onGridChange,
}) => {
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

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setRows(value);
    }
  };

  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setColumns(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onGridChange(parseInt(rows), parseInt(columns));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label>
        Rows:
        <input
          type="text"
          value={rows}
          onChange={handleRowsChange}
          placeholder="2-10"
          style={{ width: '40px', marginLeft: '4px' }}
        />
      </label>
      <label>
        Cols:
        <input
          type="text"
          value={columns}
          onChange={handleColumnsChange}
          placeholder="2-10"
          style={{ width: '40px', marginLeft: '4px' }}
        />
      </label>
      <input
        type="submit"
        value="OK"
        disabled={!isValid}
        style={{
          marginLeft: '8px',
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      />
    </form>
  );
};
