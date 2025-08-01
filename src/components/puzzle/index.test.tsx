import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Puzzle from './index';

describe('Puzzle', () => {
  it('renders without crashing', () => {
    const mockImage = 'test-image.jpg';
    render(<Puzzle image={mockImage} />);

    // Just check that it renders without throwing
    expect(document.body).toBeInTheDocument();
  });
});
