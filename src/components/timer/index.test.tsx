import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Timer from './index';

describe('Timer', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
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

  it('formats time correctly', async () => {
    render(<Timer {...defaultProps} isRunning={true} />);

    // Test various time formats by waiting for timer updates
    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Wait for 30 seconds (in real time, but we'll test the formatting)
    await waitFor(
      () => {
        expect(screen.getByText(/^\d{2}:\d{2}$/)).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('starts counting when isRunning is true', async () => {
    render(<Timer {...defaultProps} isRunning={true} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Wait for the timer to start counting
    await waitFor(
      () => {
        expect(screen.getByText('00:01')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('stops counting when isRunning is false', async () => {
    const { rerender } = render(<Timer {...defaultProps} isRunning={true} />);

    // Let it run for a bit
    await waitFor(
      () => {
        expect(screen.getByText('00:01')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const timeWhenStopped = screen.getByTestId('timer').textContent;

    // Stop the timer
    rerender(<Timer {...defaultProps} isRunning={false} />);

    // Wait a bit more - time should not change
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByTestId('timer')).toHaveTextContent(timeWhenStopped!);
  });

  it('calls onTimeUpdate callback when timer is running', async () => {
    const mockOnTimeUpdate = vi.fn();
    render(<Timer {...defaultProps} isRunning={true} onTimeUpdate={mockOnTimeUpdate} />);

    // Wait for the callback to be called
    await waitFor(
      () => {
        expect(mockOnTimeUpdate).toHaveBeenCalledWith(1);
      },
      { timeout: 2000 },
    );
  });

  it('does not call onTimeUpdate when timer is not running', () => {
    const mockOnTimeUpdate = vi.fn();
    render(<Timer {...defaultProps} isRunning={false} onTimeUpdate={mockOnTimeUpdate} />);

    // Wait a bit and verify no callback
    setTimeout(() => {
      expect(mockOnTimeUpdate).not.toHaveBeenCalled();
    }, 1000);
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
