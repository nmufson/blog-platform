import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPost from './NewPost.jsx';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { newBlogPost } from '../../services/blogPostService.js';
import { usePostForm } from '../../hooks/usePostForm/usePostForm.js';
import { useModal } from '../../hooks/useModal/useModal.js';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../services/blogPostService', () => ({
  newBlogPost: vi.fn(),
}));

vi.mock('../../hooks/usePostForm/usePostForm', () => ({
  usePostForm: vi.fn(),
}));

vi.mock('../../hooks/useModal/useModal', () => ({
  useModal: vi.fn(),
}));

vi.mock('../../components/LabelInput/LabelInput.jsx', () => ({
  default: ({ name, value, onChange, label }) => (
    <div>
      {label && <label>{label}</label>}
      <input data-testid={`input-${name}`} value={value} onChange={onChange} />
    </div>
  ),
}));

vi.mock('../../components/EditorComponent/EditorComponent.jsx', () => ({
  default: ({ content, onContentChange }) => (
    <textarea
      data-testid="editor"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
    />
  ),
}));

vi.mock('../../components/Modal/Modal.jsx', () => ({
  default: ({ isOpen, onConfirm, closeModal, title }) =>
    isOpen ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null,
}));

describe('NewPost', () => {
  const mockPost = {
    title: '',
    content: '',
    imageURL: '',
    imageAltText: '',
  };

  const mockFormErrors = {
    titleError: '',
    contentError: '',
    imageURLError: '',
    imageAltTextError: '',
  };

  const mockButtonEnabled = {
    discard: false,
    saveOrPublish: false,
  };

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useOutletContext.mockReturnValue({ user: { id: 1 } });
    useNavigate.mockReturnValue(mockNavigate);

    usePostForm.mockReturnValue({
      post: mockPost,
      formErrors: mockFormErrors,
      buttonEnabled: mockButtonEnabled,
      onChange: vi.fn(),
      resetForm: vi.fn(),
    });

    useModal.mockReturnValue({
      isModalOpen: false,
      modalType: null,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });
  });

  it('renders form fields', () => {
    render(<NewPost />);

    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByTestId('input-imageURL')).toBeInTheDocument();
    expect(screen.getByTestId('input-imageAltText')).toBeInTheDocument();
  });

  it('handles title input changes', () => {
    const onChange = vi.fn();
    usePostForm.mockReturnValue({
      ...usePostForm(),
      onChange,
    });

    render(<NewPost />);

    const titleInput = screen.getByTestId('input-title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 'title');
  });

  it('handles content changes', () => {
    const onChange = vi.fn();
    usePostForm.mockReturnValue({
      ...usePostForm(),
      onChange,
    });

    render(<NewPost />);

    const editor = screen.getByTestId('editor');
    fireEvent.change(editor, { target: { value: 'Test content' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('disables buttons when form is not valid', () => {
    render(<NewPost />);

    const publishButton = screen.getByText('Publish');
    const saveDraftButton = screen.getByText('Save Draft');
    const discardButton = screen.getByText('Discard');

    expect(publishButton).toBeDisabled();
    expect(saveDraftButton).toBeDisabled();
    expect(discardButton).toBeDisabled();
  });

  it('enables buttons when form is valid', () => {
    usePostForm.mockReturnValue({
      ...usePostForm(),
      buttonEnabled: {
        discard: true,
        saveOrPublish: true,
      },
    });

    render(<NewPost />);

    const publishButton = screen.getByText('Publish');
    const saveDraftButton = screen.getByText('Save Draft');
    const discardButton = screen.getByText('Discard');

    expect(publishButton).not.toBeDisabled();
    expect(saveDraftButton).not.toBeDisabled();
    expect(discardButton).not.toBeDisabled();
  });

  it('handles successful post submission', async () => {
    const newPostId = 1;
    newBlogPost.mockResolvedValueOnce({ newPost: { id: newPostId } });

    usePostForm.mockReturnValue({
      ...usePostForm(),
      buttonEnabled: {
        discard: true,
        saveOrPublish: true,
      },
      post: { ...mockPost, content: 'Test content' },
    });

    render(<NewPost />);

    const saveDraftButton = screen.getByText('Save Draft');
    fireEvent.click(saveDraftButton);

    await waitFor(() => {
      expect(newBlogPost).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(`/posts/${newPostId}`);
    });
  });

  it('handles discard action', () => {
    const resetForm = vi.fn();
    const { openModal } = useModal();

    usePostForm.mockReturnValue({
      ...usePostForm(),
      resetForm,
      buttonEnabled: { discard: true, saveOrPublish: false },
    });

    render(<NewPost />);

    const discardButton = screen.getByText('Discard');
    fireEvent.click(discardButton);

    expect(openModal).toHaveBeenCalledWith('discard');
  });

  it('handles submission errors', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    newBlogPost.mockRejectedValueOnce(new Error('Submission failed'));

    usePostForm.mockReturnValue({
      ...usePostForm(),
      buttonEnabled: {
        discard: true,
        saveOrPublish: true,
      },
      post: { ...mockPost, content: 'Test content' },
    });

    render(<NewPost />);

    const saveDraftButton = screen.getByText('Save Draft');
    fireEvent.click(saveDraftButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });
});
