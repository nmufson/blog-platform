import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogPost from './BlogPost';
import {
  useOutletContext,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  fetchBlogPostById,
  deleteBlogPost,
} from '../../services/blogPostService';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
  useOutletContext: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../services/blogPostService', () => ({
  fetchBlogPostById: vi.fn(),
  deleteBlogPost: vi.fn(),
  updateBlogPost: vi.fn(),
}));

vi.mock('../../components/AffectPublish/AffectPublish', () => ({
  default: () => <div data-testid="affect-publish">AffectPublish</div>,
}));

vi.mock('../../components/Blog/CommentSection/CommentSection.jsx', () => ({
  default: () => <div data-testid="comment-section">CommentSection</div>,
}));

vi.mock('../../components/Modal/Modal', () => ({
  default: ({ isOpen, onConfirm }) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null,
}));

vi.mock('../../components/EditDeleteIcons/EditDeleteIcons.jsx', () => ({
  default: ({ setIsEditing, setIsModalOpen, setModalType }) => (
    <div data-testid="edit-delete-icons">
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button
        onClick={() => {
          setModalType('delete');
          setIsModalOpen(true);
        }}
        data-testid="delete-button"
      >
        Delete
      </button>
    </div>
  ),
}));

vi.mock('../../components/EditorComponent/EditorComponent', () => ({
  default: ({ content, onContentChange }) => (
    <textarea
      data-testid="editor"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
    />
  ),
}));

vi.mock('../../utils/formatDateTime', () => ({
  default: () => ({ date: '2024-01-01', time: '12:00 PM' }),
}));

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((content) => content),
  },
}));

describe('BlogPost', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test Content',
    published: true,
    imageURL: 'test.jpg',
    imageAltText: 'test image',
    timestamp: '2024-01-01T12:00:00Z',
    userId: 1,
    user: {
      username: 'testuser',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useParams.mockReturnValue({ postId: '1' });
    useLocation.mockReturnValue({ state: null });
    useOutletContext.mockReturnValue({ user: null });
    useNavigate.mockReturnValue(vi.fn());

    fetchBlogPostById.mockResolvedValue({ post: mockPost });
  });

  const renderBlogPost = () => {
    return render(<BlogPost />);
  };

  it('renders loading state initially', () => {
    renderBlogPost();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays blog post data', async () => {
    renderBlogPost();

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('displays post image when available', async () => {
    renderBlogPost();

    await waitFor(() => {
      const image = screen.getByAltText('test image');
      expect(image).toHaveAttribute('src', 'test.jpg');
    });
  });

  it('shows edit controls for post owner', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 1, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      expect(screen.getByTestId('edit-delete-icons')).toBeInTheDocument();
    });
  });

  it('does not show edit controls for non post owner', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 2, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      expect(screen.queryByTestId('edit-delete-icons')).not.toBeInTheDocument();
    });
  });

  it('enters edit mode when edit button is clicked', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 1, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
      expect(screen.getByTestId('editor')).toBeInTheDocument();
    });
  });

  it('shows publish controls for post author', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 1, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      expect(screen.getByTestId('affect-publish')).toBeInTheDocument();
    });
  });

  it('does not show publish controls for non post author', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 2, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      expect(screen.queryByTestId('affect-publish')).not.toBeInTheDocument();
    });
  });

  it('renders comment section', async () => {
    renderBlogPost();

    await waitFor(() => {
      expect(screen.getByTestId('comment-section')).toBeInTheDocument();
    });
  });

  it('calls deleteBlogPost when delete is confirmed', async () => {
    useOutletContext.mockReturnValue({
      user: { id: 1, canPost: true },
    });

    renderBlogPost();

    await waitFor(() => {
      expect(screen.getByTestId('edit-delete-icons')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const modal = screen.getByTestId('modal');
      expect(modal).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(deleteBlogPost).toHaveBeenCalled();
  });
});
