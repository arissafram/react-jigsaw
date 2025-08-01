import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RefreshButton from './index';

describe('RefreshButton', () => {
  const defaultProps = {
    onRefresh: () => {},
    dataTestId: 'refresh-button',
  };

  it('renders without crashing', () => {
    render(<RefreshButton {...defaultProps} />);
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  });

  it('displays the refresh icon', () => {
    render(<RefreshButton {...defaultProps} />);
    const button = screen.getByTestId('refresh-button');

    // Check that the SVG is present
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has the correct title attribute', () => {
    render(<RefreshButton {...defaultProps} />);
    const button = screen.getByTestId('refresh-button');
    expect(button).toHaveAttribute('title', 'Refresh puzzle');
  });

  it('calls onRefresh when clicked', () => {
    const mockOnRefresh = vi.fn();
    render(<RefreshButton {...defaultProps} onRefresh={mockOnRefresh} />);

    const button = screen.getByTestId('refresh-button');
    fireEvent.click(button);

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const customClassName = 'custom-refresh-button';
    render(<RefreshButton {...defaultProps} className={customClassName} />);

    const button = screen.getByTestId('refresh-button');
    expect(button).toHaveClass(customClassName);
  });

  it('renders without custom className when not provided', () => {
    render(<RefreshButton {...defaultProps} />);

    const button = screen.getByTestId('refresh-button');
    // Should have the default styles class (CSS module will hash it)
    expect(button.className).toContain('refreshButton');
  });
});
