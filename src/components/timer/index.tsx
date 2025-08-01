import { FC, useState, useEffect, useRef } from 'react';

import styles from './styles.module.scss';

interface TimerProps {
  className?: string;
  dataTestId?: string;
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

const Timer: FC<TimerProps> = (props: TimerProps) => {
  const { className, dataTestId, isRunning, onTimeUpdate } = props;

  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      // Start the timer
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    } else {
      // Stop the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate]);

  // Reset timer when isRunning changes from false to true
  useEffect(() => {
    if (isRunning) {
      setSeconds(0);
    }
  }, [isRunning]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div data-testid={dataTestId} className={`${styles.timer} ${className}`}>
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;
