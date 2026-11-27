import { FC } from 'react';
interface TimerProps {
    className?: string;
    isRunning: boolean;
    onTimeUpdate?: (seconds: number) => void;
    paused?: boolean;
}
declare const Timer: FC<TimerProps>;
export default Timer;
//# sourceMappingURL=index.d.ts.map