import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PuzzleContent from './index';
import { DEFAULT_PUZZLE_OPTIONS } from '../../../../constants';
import { PuzzleProvider } from '../../../../contexts/puzzle-context';

describe('PuzzleContent', () => {
  it('renders without crashing', () => {
    const mockImage = 'test-image.jpg';
    render(
      <PuzzleProvider
        columns={DEFAULT_PUZZLE_OPTIONS.board.columns}
        rows={DEFAULT_PUZZLE_OPTIONS.board.rows}
      >
        <PuzzleContent image={mockImage} options={DEFAULT_PUZZLE_OPTIONS} />
      </PuzzleProvider>,
    );
    expect(screen.getByTestId('puzzle-content')).toBeInTheDocument();
  });

  it('shows timer when enabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        timer: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.timer,
          enabled: true,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  it('hides timer when disabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        timer: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.timer,
          enabled: false,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.queryByTestId('timer')).not.toBeInTheDocument();
  });

  it('shows refresh button when enabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        refreshButton: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.refreshButton,
          enabled: true,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  });

  it('hides refresh button when disabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        refreshButton: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.refreshButton,
          enabled: false,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.queryByTestId('refresh-button')).not.toBeInTheDocument();
  });

  it('shows edit rows and columns when enabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        rowsAndColumns: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.rowsAndColumns,
          enabled: true,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.getByTestId('edit-rows-columns')).toBeInTheDocument();
  });

  it('hides edit rows and columns when disabled', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        rowsAndColumns: {
          ...DEFAULT_PUZZLE_OPTIONS.puzzle.rowsAndColumns,
          enabled: false,
        },
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    expect(screen.queryByTestId('edit-rows-columns')).not.toBeInTheDocument();
  });

  it('applies aspectRatioStyle when responsive is true', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        responsive: true,
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    const puzzleContent = screen.getByTestId('puzzle-content');
    expect(puzzleContent).toHaveStyle('--puzzle-aspect-ratio: 0.8');
  });

  it('does not apply aspectRatioStyle when responsive is false', () => {
    const options = {
      ...DEFAULT_PUZZLE_OPTIONS,
      puzzle: {
        ...DEFAULT_PUZZLE_OPTIONS.puzzle,
        responsive: false,
      },
    };
    render(
      <PuzzleProvider columns={options.board.columns} rows={options.board.rows}>
        <PuzzleContent image="test-image.jpg" options={options} />
      </PuzzleProvider>,
    );
    const puzzleContent = screen.getByTestId('puzzle-content');
    expect(puzzleContent).not.toHaveStyle('--puzzle-aspect-ratio: 0.8');
  });
});
