import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AffectPublish from './AffectPublish';

describe('AffectPublish', () => {
  it('displays published message when post is published', () => {
    const mockPost = { published: true };
    const mockHandleClick = vi.fn();

    render(
      <AffectPublish
        post={mockPost}
        handleAffectPublishClick={mockHandleClick}
      />,
    );

    expect(
      screen.getByText('This post is currently published.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Select to unpublish')).toBeInTheDocument();
  });

  it('displays draft message when post is not published', () => {
    const mockPost = { published: false };
    const mockHandleClick = vi.fn();

    render(
      <AffectPublish
        post={mockPost}
        handleAffectPublishClick={mockHandleClick}
      />,
    );

    expect(
      screen.getByText('This post is currently saved as a draft.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Select to publish')).toBeInTheDocument();
  });

  it('calls handleAffectPublishClick when publish button is clicked', () => {
    const mockPost = { published: false };
    const mockHandleClick = vi.fn();

    render(
      <AffectPublish
        post={mockPost}
        handleAffectPublishClick={mockHandleClick}
      />,
    );

    fireEvent.click(screen.getByText('Select to publish'));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    // expect(
    //   screen.getByText('This post is currently published.'),
    // ).toBeInTheDocument();
  });

  it('calls handleAffectPublishClick when unpublish button is clicked', () => {
    const mockPost = { published: true };
    const mockHandleClick = vi.fn();

    render(
      <AffectPublish
        post={mockPost}
        handleAffectPublishClick={mockHandleClick}
      />,
    );

    fireEvent.click(screen.getByText('Select to unpublish'));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
