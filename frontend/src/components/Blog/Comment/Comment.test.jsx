import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
}));

vi.mock('../../../utils/formatDateTime', () => ({
  default: () => ({
    date: 'January 1, 2024',
    time: '12:00 PM',
  }),
}));

const mockComment = {
  id: 1,
  content: 'Test comment content',
  timestamp: '2024-01-01T12:00:00Z',
  userId: 1,
  user: {
    id: 1,
    username: 'testuser',
  },
};

const mockPost = {
  id: 1,
  userId: 2,
};

const mockUser = {
  id: 1,
  username: 'testuser',
};

const mockOpenModal = vi.fn();

import { useOutletContext } from 'react-router-dom';

describe('Comment', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useOutletContext.mockReturnValue({ user: null });
  });

  it('renders comment content correctly', () => {
    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    expect(screen.getByText('Test comment content')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM - January 1, 2024')).toBeInTheDocument();
  });

  it('shows delete icon for comment owner', () => {
    useOutletContext.mockReturnValue({ user: mockUser });

    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    const deleteIcon = screen.getByTitle('delete');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('shows delete icon for post owner', () => {
    useOutletContext.mockReturnValue({
      user: { id: mockPost.userId, username: 'postowner' },
    });

    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    const deleteIcon = screen.getByTitle('delete');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('hides delete icon for non-owners', () => {
    useOutletContext.mockReturnValue({
      user: { id: 999, username: 'otheruser' },
    });

    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    expect(screen.queryByTitle('delete')).not.toBeInTheDocument();
  });

  it('calls openModal when delete icon is clicked', () => {
    useOutletContext.mockReturnValue({ user: mockUser });

    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    const deleteIcon = screen.getByTitle('delete');
    fireEvent.click(deleteIcon);
    expect(mockOpenModal).toHaveBeenCalledWith(mockComment);
  });

  it('handles null user correctly', () => {
    useOutletContext.mockReturnValue({ user: null });

    render(
      <Comment
        comment={mockComment}
        post={mockPost}
        openModal={mockOpenModal}
      />,
    );

    expect(screen.queryByTitle('delete')).not.toBeInTheDocument();
  });
});
