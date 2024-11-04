import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../../services/blogPostService';
import shuffleArr from '../../utils/shuffleArr';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../services/blogPostService', () => ({
  fetchBlogPosts: vi.fn(),
}));

vi.mock('../../utils/shuffleArr', () => ({
  default: vi.fn((arr) => arr),
}));

vi.mock('../../components/Blog/BlogPreview/BlogPreview', () => ({
  default: ({ post }) => <div data-testid="blog-preview">{post.title}</div>,
}));

describe('Home', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
    { id: 6, title: 'Post 6' },
  ];

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useOutletContext.mockReturnValue({ user: null });
    fetchBlogPosts.mockResolvedValue({ posts: mockPosts });
  });

  it('fetches and displays posts', async () => {
    render(<Home />);

    expect(fetchBlogPosts).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getAllByTestId('blog-preview')).toHaveLength(6);
    });
  });

  it('displays first four posts in top grid', async () => {
    render(<Home />);

    await waitFor(() => {
      const previews = screen.getAllByTestId('blog-preview');
      expect(previews.slice(0, 4)).toHaveLength(4);
    });
  });

  it('displays remaining posts in other posts section', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Other Posts')).toBeInTheDocument();
      const previews = screen.getAllByTestId('blog-preview');
      expect(previews.slice(4)).toHaveLength(2);
    });
  });

  it('shows new post button for users with canPost permission', async () => {
    useOutletContext.mockReturnValue({
      user: { canPost: true },
    });

    fetchBlogPosts.mockResolvedValue({
      posts: [{ id: 1, title: 'Test Post' }],
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Draft New Post')).toBeInTheDocument();
    });
  });

  it('hides new post button for users without canPost permission', async () => {
    useOutletContext.mockReturnValue({
      user: { canPost: false },
    });

    render(<Home />);

    expect(screen.queryByText('Draft New Post')).not.toBeInTheDocument();
  });

  it('navigates to new post page when button is clicked', async () => {
    useOutletContext.mockReturnValue({
      user: { canPost: true },
    });

    fetchBlogPosts.mockResolvedValue({
      posts: [{ id: 1, title: 'Test Post' }],
    });

    render(<Home />);

    await waitFor(() => {
      const button = screen.getByText('Draft New Post');
      fireEvent.click(button);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/newpost');
  });

  it('displays error message when posts fail to load', async () => {
    const errorMessage = 'Failed to load posts';
    fetchBlogPosts.mockRejectedValue(new Error(errorMessage));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles empty posts array', async () => {
    fetchBlogPosts.mockResolvedValue({ posts: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('No posts yet.')).toBeInTheDocument();
      expect(screen.queryByText('Other Posts')).not.toBeInTheDocument();
      expect(screen.queryByTestId('blog-preview')).not.toBeInTheDocument();
    });
  });

  it('shuffles posts array', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(shuffleArr).toHaveBeenCalledWith(mockPosts);
    });
  });
});
