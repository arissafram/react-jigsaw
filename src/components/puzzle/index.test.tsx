import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Puzzle from './index';

describe('Puzzle', () => {
  it('renders without crashing', () => {
    const mockImage = 'test-image.jpg';
    render(<Puzzle image={mockImage} />);
    expect(document.body).toBeInTheDocument();
  });
});
