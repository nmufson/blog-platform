import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPreview from './BlogPreview';

vi.mock('../../../utils/formatDateTime', () => ({
  default: () => ({ date: 'January 1, 2024' }),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('BlogPreview', () => {
  const mockPost = {
    id: 1,
    imageURL: 'https://example.com/image.jpg',
    imageAltText: 'Test image',
    title: 'Test Blog Post',
    timestamp: '2024-01-01T12:00:00Z',
    user: {
      username: 'testuser',
    },
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all post information correctly', () => {
    render(<BlogPreview post={mockPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('navigates to the correct post when clicked', () => {
    render(<BlogPreview post={mockPost} />);

    fireEvent.click(screen.getByText('Test Blog Post'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/posts/1', {
      state: { post: mockPost },
    });
  });

  it('navigates when clicking anywhere in the preview', () => {
    render(<BlogPreview post={mockPost} />);

    fireEvent.click(screen.getByRole('img'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/posts/1', {
      state: { post: mockPost },
    });
  });
});
