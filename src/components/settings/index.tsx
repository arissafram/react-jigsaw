import { FC } from 'react';
import { RowsAndColumns } from './components/rows-and-columns';
import { RefreshButton } from './components/refresh-button';
import styles from './styles.module.scss';

interface SettingsProps {
  currentRows: number;
  currentColumns: number;
  onGridChange: (rows: number, columns: number) => void;
  onRefresh: () => void;
}

const Settings: FC<SettingsProps> = ({ currentRows, currentColumns, onGridChange, onRefresh }) => {
  return (
    <div className={styles.settingsContainer}>
      <RowsAndColumns
        currentRows={currentRows}
        currentColumns={currentColumns}
        onGridChange={onGridChange}
      />
      <RefreshButton onRefresh={onRefresh} />
      {/* Timer will go here later */}
    </div>
  );
};

export default Settings;
