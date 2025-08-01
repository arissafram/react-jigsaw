import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Timer from './index';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const defaultProps = {
    isRunning: false,
    dataTestId: 'timer',
  };

  it('renders without crashing', () => {
    render(<Timer {...defaultProps} />);
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  it('displays initial time as 00:00', () => {
    render(<Timer {...defaultProps} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('formats time correctly', () => {
    render(<Timer {...defaultProps} isRunning={true} />);

    // Test various time formats by advancing the timer
    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Advance to 30 seconds
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.getByText('00:30')).toBeInTheDocument();

    // Advance to 1 minute
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.getByText('01:00')).toBeInTheDocument();

    // Advance to 1 minute 30 seconds
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.getByText('01:30')).toBeInTheDocument();

    // Advance to 2 minutes 5 seconds
    act(() => {
      vi.advanceTimersByTime(35000);
    });
    expect(screen.getByText('02:05')).toBeInTheDocument();
  });

  it('starts counting when isRunning is true', () => {
    render(<Timer {...defaultProps} isRunning={true} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Advance timer by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:01')).toBeInTheDocument();
  });

  it('stops counting when isRunning is false', () => {
    const { rerender } = render(<Timer {...defaultProps} isRunning={true} />);

    // Let it run for 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:02')).toBeInTheDocument();

    // Stop the timer
    rerender(<Timer {...defaultProps} isRunning={false} />);

    // Advance timer by another second - should not change
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('resets to 00:00 when isRunning changes from false to true', () => {
    const { rerender } = render(<Timer {...defaultProps} isRunning={true} />);

    // Let it run for 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:03')).toBeInTheDocument();

    // Stop the timer
    rerender(<Timer {...defaultProps} isRunning={false} />);

    // Start the timer again - should reset to 00:00
    rerender(<Timer {...defaultProps} isRunning={true} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('calls onTimeUpdate callback when timer is running', () => {
    const mockOnTimeUpdate = vi.fn();
    render(<Timer {...defaultProps} isRunning={true} onTimeUpdate={mockOnTimeUpdate} />);

    // Advance timer by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockOnTimeUpdate).toHaveBeenCalledWith(1);

    // Advance timer by another second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockOnTimeUpdate).toHaveBeenCalledWith(2);
  });

  it('does not call onTimeUpdate when timer is not running', () => {
    const mockOnTimeUpdate = vi.fn();
    render(<Timer {...defaultProps} isRunning={false} onTimeUpdate={mockOnTimeUpdate} />);

    // Advance timer by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockOnTimeUpdate).not.toHaveBeenCalled();
  });

  it('applies custom className when provided', () => {
    const customClassName = 'custom-timer';
    render(<Timer {...defaultProps} className={customClassName} />);

    const timerElement = screen.getByTestId('timer');
    expect(timerElement).toHaveClass(customClassName);
  });

  it('renders without custom className when not provided', () => {
    render(<Timer {...defaultProps} />);

    const timerElement = screen.getByTestId('timer');
    // Should have the default styles class (CSS module will hash it)
    expect(timerElement.className).toContain('timer');
  });
});
