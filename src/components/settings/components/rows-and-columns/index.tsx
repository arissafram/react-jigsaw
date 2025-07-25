import { FC, useState, useEffect } from 'react';

import styles from './styles.module.scss';

interface RowsAndColumnsProps {
  className?: string;
  currentRows: number;
  currentColumns: number;
  onBoardSlotChange: (rows: number, columns: number) => void;
}

export const RowsAndColumns: FC<RowsAndColumnsProps> = ({
  className,
  currentRows,
  currentColumns,
  onBoardSlotChange,
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
      onBoardSlotChange(parseInt(rows), parseInt(columns));
    }
  };

  return (
    <form className={`${styles.rowsAndColumns} ${className}`} onSubmit={handleSubmit}>
      <label>
        Rows:
        <input type="text" value={rows} onChange={handleRowsChange} placeholder="2-10" />
      </label>
      <label>
        Cols:
        <input type="text" value={columns} onChange={handleColumnsChange} placeholder="2-10" />
      </label>
      <input type="submit" value="Ok" disabled={!isValid} />
    </form>
  );
};
