import { FC } from 'react';
import { RowsAndColumns } from './components/rows-and-columns';
import styles from './styles.module.scss';

interface SettingsProps {
  currentRows: number;
  currentColumns: number;
  onGridChange: (rows: number, columns: number) => void;
}

const Settings: FC<SettingsProps> = ({ currentRows, currentColumns, onGridChange }) => {
  return (
    <div className={styles.settingsContainer}>
      <RowsAndColumns
        currentRows={currentRows}
        currentColumns={currentColumns}
        onGridChange={onGridChange}
      />
      {/* Timer, Reset button will go here later */}
    </div>
  );
};

export default Settings;
