import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PuzzleProvider, usePuzzleContext } from './puzzle-context';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component to access context
const TestComponent = ({ testId = 'test' }: { testId?: string }) => {
  const context = usePuzzleContext();
  return (
    <div>
      <div data-testid={`columns-${testId}`}>{context.columns}</div>
      <div data-testid={`rows-${testId}`}>{context.rows}</div>
      <div data-testid={`numPieces-${testId}`}>{context.numPieces}</div>
      <div data-testid={`refreshCount-${testId}`}>{context.refreshCount}</div>
      <div data-testid={`timerIsRunning-${testId}`}>{context.timerIsRunning.toString()}</div>
      <button data-testid={`setBoardGrid-${testId}`} onClick={() => context.setBoardGrid(3, 4)}>
        Set Board Grid
      </button>
      <button data-testid={`refreshBoard-${testId}`} onClick={context.refreshBoard}>
        Refresh Board
      </button>
      <button
        data-testid={`setTimerIsRunning-${testId}`}
        onClick={() => context.setTimerIsRunning(false)}
      >
        Stop Timer
      </button>
    </div>
  );
};

describe('PuzzleProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    cleanup();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it('renders children with default values', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="default" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-default')).toHaveTextContent('4');
    expect(screen.getByTestId('rows-default')).toHaveTextContent('5');
    expect(screen.getByTestId('numPieces-default')).toHaveTextContent('20');
    expect(screen.getByTestId('refreshCount-default')).toHaveTextContent('0');
    expect(screen.getByTestId('timerIsRunning-default')).toHaveTextContent('true');
  });

  it('loads values from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ rows: 6, columns: 7 }));

    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="localStorage" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-localStorage')).toHaveTextContent('7');
    expect(screen.getByTestId('rows-localStorage')).toHaveTextContent('6');
    expect(screen.getByTestId('numPieces-localStorage')).toHaveTextContent('42');
  });

  it('uses props when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <PuzzleProvider columns={3} rows={8}>
        <TestComponent testId="empty" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-empty')).toHaveTextContent('3');
    expect(screen.getByTestId('rows-empty')).toHaveTextContent('8');
    expect(screen.getByTestId('numPieces-empty')).toHaveTextContent('24');
  });

  it('uses props when localStorage has invalid data', () => {
    // Mock JSON.parse to throw an error for invalid JSON
    const originalJSONParse = JSON.parse;
    JSON.parse = vi.fn(() => {
      throw new Error('Invalid JSON');
    });

    render(
      <PuzzleProvider columns={2} rows={6}>
        <TestComponent testId="invalid" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-invalid')).toHaveTextContent('2');
    expect(screen.getByTestId('rows-invalid')).toHaveTextContent('6');
    expect(screen.getByTestId('numPieces-invalid')).toHaveTextContent('12');

    // Restore original JSON.parse
    JSON.parse = originalJSONParse;
  });

  it('uses props when localStorage has missing properties', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ rows: 4 }));

    render(
      <PuzzleProvider columns={5} rows={3}>
        <TestComponent testId="missing" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-missing')).toHaveTextContent('5');
    expect(screen.getByTestId('rows-missing')).toHaveTextContent('3');
    expect(screen.getByTestId('numPieces-missing')).toHaveTextContent('15');
  });

  it('updates board grid when setBoardGrid is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="grid" />
      </PuzzleProvider>,
    );

    const setBoardGridButton = screen.getByTestId('setBoardGrid-grid');

    act(() => {
      setBoardGridButton.click();
    });

    expect(screen.getByTestId('columns-grid')).toHaveTextContent('4');
    expect(screen.getByTestId('rows-grid')).toHaveTextContent('3');
    expect(screen.getByTestId('numPieces-grid')).toHaveTextContent('12');
  });

  it('stops and restarts timer when setBoardGrid is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="timer1" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning-timer1')).toHaveTextContent('true');

    const setBoardGridButton = screen.getByTestId('setBoardGrid-timer1');

    act(() => {
      setBoardGridButton.click();
    });

    // Timer should be stopped immediately
    expect(screen.getByTestId('timerIsRunning-timer1')).toHaveTextContent('false');

    // Timer should restart after 10ms
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(screen.getByTestId('timerIsRunning-timer1')).toHaveTextContent('true');
  });

  it('increments refresh count when refreshBoard is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="refresh" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('refreshCount-refresh')).toHaveTextContent('0');

    const refreshBoardButton = screen.getByTestId('refreshBoard-refresh');

    act(() => {
      refreshBoardButton.click();
    });

    expect(screen.getByTestId('refreshCount-refresh')).toHaveTextContent('1');

    act(() => {
      refreshBoardButton.click();
    });

    expect(screen.getByTestId('refreshCount-refresh')).toHaveTextContent('2');
  });

  it('stops and restarts timer when refreshBoard is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="timer2" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning-timer2')).toHaveTextContent('true');

    const refreshBoardButton = screen.getByTestId('refreshBoard-timer2');

    act(() => {
      refreshBoardButton.click();
    });

    // Timer should be stopped immediately
    expect(screen.getByTestId('timerIsRunning-timer2')).toHaveTextContent('false');

    // Timer should restart after 10ms
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(screen.getByTestId('timerIsRunning-timer2')).toHaveTextContent('true');
  });

  it('allows manual timer control', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponent testId="manual" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning-manual')).toHaveTextContent('true');

    const setTimerButton = screen.getByTestId('setTimerIsRunning-manual');

    act(() => {
      setTimerButton.click();
    });

    expect(screen.getByTestId('timerIsRunning-manual')).toHaveTextContent('false');
  });

  it('calculates numPieces correctly', () => {
    render(
      <PuzzleProvider columns={3} rows={7}>
        <TestComponent testId="calc" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('numPieces-calc')).toHaveTextContent('21');
  });

  it('handles zero values', () => {
    render(
      <PuzzleProvider columns={0} rows={0}>
        <TestComponent testId="zero" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-zero')).toHaveTextContent('0');
    expect(screen.getByTestId('rows-zero')).toHaveTextContent('0');
    expect(screen.getByTestId('numPieces-zero')).toHaveTextContent('0');
  });

  it('handles large values', () => {
    render(
      <PuzzleProvider columns={100} rows={50}>
        <TestComponent testId="large" />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns-large')).toHaveTextContent('100');
    expect(screen.getByTestId('rows-large')).toHaveTextContent('50');
    expect(screen.getByTestId('numPieces-large')).toHaveTextContent('5000');
  });
});

describe('usePuzzleContext', () => {
  afterEach(() => {
    cleanup();
  });

  it('throws error when used outside PuzzleProvider', () => {
    const TestComponentWithoutProvider = () => {
      usePuzzleContext();
      return <div>Test</div>;
    };

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('usePuzzleContext must be used within a PuzzleProvider');
  });

  it('provides context when used within PuzzleProvider', () => {
    const TestComponentWithProvider = () => {
      const context = usePuzzleContext();
      return <div data-testid="context">{context.columns}</div>;
    };

    render(
      <PuzzleProvider columns={4} rows={5}>
        <TestComponentWithProvider />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('context')).toHaveTextContent('4');
  });
});
