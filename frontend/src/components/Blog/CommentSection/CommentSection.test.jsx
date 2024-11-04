import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import DOMPurify from 'dompurify';
import CommentSection from './CommentSection';
import { BrowserRouter } from 'react-router-dom';

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((content) => content),
  },
}));

vi.mock('../Comment/Comment', () => ({
  default: ({ comment, post, openModal }) => {
    const { user } = useOutletContext();

    return (
      <div>
        {comment.content}
        {user && (comment.userId === user.id || post.userId === user.id) && (
          <svg data-testid="delete-icon" onClick={() => openModal(comment)}>
            <title>delete</title>
          </svg>
        )}
      </div>
    );
  },
}));

vi.mock('../../../services/commentService', () => ({
  submitComment: vi.fn(),
  deleteComment: vi.fn(),
}));

vi.mock('../../../services/blogPostService', () => ({
  fetchBlogPostById: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

vi.mock('../../Modal/Modal', () => ({
  default: ({ isOpen, onClose, onConfirm, children }) =>
    isOpen ? (
      <div data-testid="modal">
        {children}
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null,
}));

import { submitComment, deleteComment } from '../../../services/commentService';
import { fetchBlogPostById } from '../../../services/blogPostService';

describe('CommentSection', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
  };

  const mockPost = {
    id: 1,
    userId: 1,
    comments: [
      {
        id: 1,
        content: 'Test comment',
        userId: 1,
        user: { username: 'testuser' },
        timestamp: '2024-01-01T12:00:00Z',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useOutletContext.mockReturnValue({ user: null });
    fetchBlogPostById.mockResolvedValue({ post: mockPost });
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <CommentSection postId={1} />
      </BrowserRouter>,
    );
  };

  it('renders login prompt when user is not logged in', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Log In')).toBeInTheDocument();
      expect(screen.getByText(/to comment/)).toBeInTheDocument();
    });
  });

  it('fetches and displays comments on load', async () => {
    renderComponent();

    await waitFor(() => {
      expect(fetchBlogPostById).toHaveBeenCalledWith(1);
      expect(screen.getByText('Test comment')).toBeInTheDocument();
    });
  });

  it('displays comment form when user is logged in', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Leave a comment...'),
      ).toBeInTheDocument();
    });
  });

  it('handles comment submission', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText('Leave a comment...');
      fireEvent.focus(textarea);
      fireEvent.change(textarea, { target: { value: 'New comment' } });
    });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitComment).toHaveBeenCalledWith('New comment', mockUser, 1);
      expect(fetchBlogPostById).toHaveBeenCalledTimes(2); // Initial load + after submission
    });
  });

  it('shows no comments message when there are no comments', async () => {
    fetchBlogPostById.mockResolvedValueOnce({
      post: { ...mockPost, comments: [] },
    });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No comments yet.')).toBeInTheDocument();
    });
  });

  it('handles comment deletion', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test comment')).toBeInTheDocument();
    });

    const deleteIcon = screen.getByTitle('delete');
    fireEvent.click(deleteIcon);

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalledWith(1, mockUser, 1);
    });
  });

  it('handles cancel button in comment form', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    const textarea = await screen.findByPlaceholderText('Leave a comment...');
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: 'Draft comment' } });

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(textarea.value).toBe('');
  });

  it('sanitizes comment input', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    const textarea = await screen.findByPlaceholderText('Leave a comment...');
    fireEvent.focus(textarea);
    fireEvent.change(textarea, {
      target: { value: '<script>alert("xss")</script>Comment' },
    });

    expect(DOMPurify.sanitize).toHaveBeenCalled();
  });

  it('disables submit button when comment is empty', async () => {
    useOutletContext.mockReturnValue({ user: mockUser });
    renderComponent();

    const submitButton = await screen.findByText('Submit');
    expect(submitButton.className).toContain('disabled');
  });

  it('handles API errors gracefully', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    fetchBlogPostById.mockRejectedValueOnce(new Error('API Error'));

    renderComponent();

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });
});
