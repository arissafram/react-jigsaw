import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
const Timer = (props) => {
    const { className, isRunning, onTimeUpdate } = props;
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);
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
        }
        else {
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
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsx("div", { "data-testid": "timer", className: `${styles.timer} ${className}`, children: formatTime(seconds) }));
};
export default Timer;
//# sourceMappingURL=index.js.map