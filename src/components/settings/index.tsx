import { FC } from 'react';
import { RowsAndColumns } from './components/rows-and-columns';
import { Timer } from './components/timer';
import { RefreshButton } from './components/refresh-button';
import styles from './styles.module.scss';

interface SettingsProps {
  currentRows: number;
  currentColumns: number;
  onGridChange: (rows: number, columns: number) => void;
  onRefresh: () => void;
  timerIsRunning: boolean;
}

const Settings: FC<SettingsProps> = ({
  currentRows,
  currentColumns,
  onGridChange,
  onRefresh,
  timerIsRunning,
}) => {
  return (
    <div className={styles.settingsContainer}>
      <RowsAndColumns
        currentRows={currentRows}
        currentColumns={currentColumns}
        onGridChange={onGridChange}
      />
      <div className={styles.rightContainer}>
        <Timer isRunning={timerIsRunning} />
        <RefreshButton onRefresh={onRefresh} />
      </div>
    </div>
  );
};

export default Settings;
