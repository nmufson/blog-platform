import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePostForm } from './usePostForm';
import DOMPurify from 'dompurify';
import { validateField } from '../../pages/NewPost/NewPostUtils.js';

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((value) => value),
  },
}));

vi.mock('../../pages/NewPost/NewPostUtils.js', () => ({
  validateField: vi.fn(),
}));

describe('usePostForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    validateField.mockImplementation(() => {});
  });

  it('initializes with empty values', () => {
    const { result } = renderHook(() => usePostForm());

    expect(result.current.post).toEqual({
      title: '',
      content: '',
      imageURL: '',
      imageAltText: '',
    });

    expect(result.current.formErrors).toEqual({
      titleError: '',
      contentError: '',
      imageURLError: '',
      imageAltTextError: '',
    });

    expect(result.current.buttonEnabled).toEqual({
      discard: false,
      saveOrPublish: false,
    });
  });

  it('handles field changes and sanitizes input', () => {
    const { result } = renderHook(() => usePostForm());

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: 'Test Title' } },
        'title',
      );
    });

    expect(DOMPurify.sanitize).toHaveBeenCalledWith('Test Title');
    expect(result.current.post.title).toBe('Test Title');
  });

  it('enables discard button when any field has value', () => {
    const { result } = renderHook(() => usePostForm());

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: 'Test' } },
        'title',
      );
    });

    expect(result.current.buttonEnabled.discard).toBe(true);
  });

  it('enables saveOrPublish button when all fields are filled and valid', () => {
    const { result } = renderHook(() => usePostForm());

    validateField.mockImplementation(() => {});

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: 'Test Title' } },
        'title',
      );
      result.current.onChange(
        { target: { name: 'content', value: 'Test Content' } },
        'content',
      );
      result.current.onChange(
        { target: { name: 'imageURL', value: 'http://test.com/image.jpg' } },
        'imageURL',
      );
      result.current.onChange(
        { target: { name: 'imageAltText', value: 'Test Alt Text' } },
        'imageAltText',
      );
    });

    expect(result.current.buttonEnabled.saveOrPublish).toBe(true);
  });

  it('keeps saveOrPublish button disabled when there are errors', () => {
    const { result } = renderHook(() => usePostForm());

    validateField.mockImplementation((name, value, post, setFormErrors) => {
      setFormErrors((prev) => ({
        ...prev,
        titleError: 'Title is required',
      }));
    });

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: '' } },
        'title',
      );
    });

    expect(result.current.buttonEnabled.saveOrPublish).toBe(false);
  });

  it('resets form to initial state', () => {
    const { result } = renderHook(() => usePostForm());

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: 'Test Title' } },
        'title',
      );
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.post).toEqual({
      title: '',
      content: '',
      imageURL: '',
      imageAltText: '',
    });

    expect(result.current.buttonEnabled).toEqual({
      discard: false,
      saveOrPublish: false,
    });

    expect(result.current.formErrors).toEqual({
      titleError: '',
      contentError: '',
      imageURLError: '',
      imageAltTextError: '',
    });
  });

  it('validates fields using validateField utility', () => {
    const { result } = renderHook(() => usePostForm());

    act(() => {
      result.current.onChange(
        { target: { name: 'title', value: 'Test Title' } },
        'title',
      );
    });

    expect(validateField).toHaveBeenCalled();
  });
});
