import { FC } from 'react';
import { RowsAndColumns } from './components/rows-and-columns';
import { Timer } from './components/timer';
import { RefreshButton } from './components/refresh-button';
import styles from './styles.module.scss';
import { PuzzleOptions } from '@/types';

interface SettingsProps {
  currentRows: number;
  currentColumns: number;
  onBoardSlotChange: (rows: number, columns: number) => void;
  onRefresh: () => void;
  settings: PuzzleOptions['puzzle']['settings'];
  timerIsRunning: boolean;
}

const Settings: FC<SettingsProps> = ({
  currentRows,
  currentColumns,
  onBoardSlotChange,
  onRefresh,
  settings,
  timerIsRunning,
}) => {
  const { className, enabled, timer, refreshButton, rowsAndColumns } = settings;

  if (!enabled) return null;

  return (
    <div className={`${styles.settingsContainer} ${className}`}>
      {rowsAndColumns.enabled && (
        <RowsAndColumns
          className={rowsAndColumns.className}
          currentRows={currentRows}
          currentColumns={currentColumns}
          onBoardSlotChange={onBoardSlotChange}
        />
      )}
      {(timer.enabled || refreshButton.enabled) && (
        <div className={styles.rightContainer}>
          {timer.enabled && <Timer className={timer.className} isRunning={timerIsRunning} />}
          {refreshButton.enabled && (
            <RefreshButton className={refreshButton.className} onRefresh={onRefresh} />
          )}
        </div>
      )}
      {rowsAndColumns.enabled && <span className={styles.inlineNote}>(Valid numbers: 2-9)</span>}
    </div>
  );
};

export default Settings;
