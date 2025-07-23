import { FC, useState, useEffect, useRef } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

export const Timer: FC<TimerProps> = ({ isRunning, onTimeUpdate }) => {
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '60px',
        padding: '4px 8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        background: '#fff',
        fontFamily: 'monospace',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {formatTime(seconds)}
    </div>
  );
};
