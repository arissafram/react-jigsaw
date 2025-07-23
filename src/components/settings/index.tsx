import { FC } from 'react';
import { RowsColumns } from './components/RowsColumns';
import styles from './styles.module.scss';

interface SettingsProps {
  currentRows: number;
  currentColumns: number;
  onGridChange: (rows: number, columns: number) => void;
}

const Settings: FC<SettingsProps> = ({ currentRows, currentColumns, onGridChange }) => {
  return (
    <div className={styles.settingsContainer}>
      <RowsColumns
        currentRows={currentRows}
        currentColumns={currentColumns}
        onGridChange={onGridChange}
      />
      {/* Timer, Reset button will go here later */}
    </div>
  );
};

export default Settings;
