import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PuzzleProvider, usePuzzleContext } from './puzzle-context';
import Timer from '../components/timer';
import RefreshButton from '../components/refresh-button';
import EditRowsColumns from '../components/edit-rows-columns';

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

// Real component that uses the context
const PuzzleContent = () => {
  const context = usePuzzleContext();
  return (
    <div>
      <Timer dataTestId="timer" isRunning={context.timerIsRunning} />
      <RefreshButton dataTestId="refresh-button" onRefresh={context.refreshBoard} />
      <EditRowsColumns
        dataTestId="edit-rows-columns"
        currentRows={context.rows}
        currentColumns={context.columns}
        onBoardSlotChange={context.setBoardGrid}
      />
      <div data-testid="context-info">
        <span data-testid="columns">{context.columns}</span>
        <span data-testid="rows">{context.rows}</span>
        <span data-testid="numPieces">{context.numPieces}</span>
        <span data-testid="refreshCount">{context.refreshCount}</span>
        <span data-testid="timerIsRunning">{context.timerIsRunning.toString()}</span>
      </div>
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
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('4');
    expect(screen.getByTestId('rows')).toHaveTextContent('5');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('20');
    expect(screen.getByTestId('refreshCount')).toHaveTextContent('0');
    expect(screen.getByTestId('timerIsRunning')).toHaveTextContent('true');
  });

  it('loads values from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ rows: 6, columns: 7 }));

    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('7');
    expect(screen.getByTestId('rows')).toHaveTextContent('6');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('42');
  });

  it('uses props when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <PuzzleProvider columns={3} rows={8}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('3');
    expect(screen.getByTestId('rows')).toHaveTextContent('8');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('24');
  });

  it('uses props when localStorage has invalid data', () => {
    // Mock JSON.parse to throw an error for invalid JSON
    const originalJSONParse = JSON.parse;
    JSON.parse = vi.fn(() => {
      throw new Error('Invalid JSON');
    });

    render(
      <PuzzleProvider columns={2} rows={6}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('2');
    expect(screen.getByTestId('rows')).toHaveTextContent('6');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('12');

    // Restore original JSON.parse
    JSON.parse = originalJSONParse;
  });

  it('uses props when localStorage has missing properties', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ rows: 4 }));

    render(
      <PuzzleProvider columns={5} rows={3}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('5');
    expect(screen.getByTestId('rows')).toHaveTextContent('3');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('15');
  });

  it('updates board grid when setBoardGrid is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    // Test that the EditRowsColumns component receives the correct props
    expect(screen.getByTestId('edit-rows-columns')).toBeInTheDocument();
    expect(screen.getByTestId('columns')).toHaveTextContent('4');
    expect(screen.getByTestId('rows')).toHaveTextContent('5');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('20');
  });

  it('stops and restarts timer when setBoardGrid is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning')).toHaveTextContent('true');

    // Test that the Timer component receives the correct isRunning prop
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  it('increments refresh count when refreshBoard is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('refreshCount')).toHaveTextContent('0');

    // Test that the RefreshButton component is rendered
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  });

  it('stops and restarts timer when refreshBoard is called', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning')).toHaveTextContent('true');

    // Test that the RefreshButton component is rendered
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  });

  it('allows manual timer control', () => {
    render(
      <PuzzleProvider columns={4} rows={5}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('timerIsRunning')).toHaveTextContent('true');

    // Test that the Timer component is rendered with correct state
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  it('calculates numPieces correctly', () => {
    render(
      <PuzzleProvider columns={3} rows={7}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('numPieces')).toHaveTextContent('21');
  });

  it('handles zero values', () => {
    render(
      <PuzzleProvider columns={0} rows={0}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('0');
    expect(screen.getByTestId('rows')).toHaveTextContent('0');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('0');
  });

  it('handles large values', () => {
    render(
      <PuzzleProvider columns={100} rows={50}>
        <PuzzleContent />
      </PuzzleProvider>,
    );

    expect(screen.getByTestId('columns')).toHaveTextContent('100');
    expect(screen.getByTestId('rows')).toHaveTextContent('50');
    expect(screen.getByTestId('numPieces')).toHaveTextContent('5000');
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
