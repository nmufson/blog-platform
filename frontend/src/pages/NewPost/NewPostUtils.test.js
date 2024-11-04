import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateField } from './NewPostUtils';

describe('NewPostUtils validation', () => {
  let mockSetFormErrors;

  beforeEach(() => {
    mockSetFormErrors = vi.fn();
  });

  describe('validateField', () => {
    it('validates title field', () => {
      validateField('title', '', null, mockSetFormErrors);
      expect(mockSetFormErrors).toHaveBeenCalledWith(expect.any(Function));

      // Get the update function and call it with empty previous errors
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.titleError).toBe('Title cannot be blank');
    });

    it('validates content field', () => {
      validateField('content', '', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.contentError).toBe('Content cannot be blank');
    });

    it('validates imageURL field', () => {
      validateField('imageURL', 'invalid-url', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageURLError).toBe('Please enter a valid image URL');
    });

    it('validates imageAltText field', () => {
      validateField('imageAltText', '', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageAltTextError).toBe('Alt text cannot be blank');
    });
  });

  describe('Title Validation', () => {
    it('handles empty title', () => {
      validateField('title', '', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.titleError).toBe('Title cannot be blank');
    });

    it('handles title too short', () => {
      validateField('title', 'Test', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.titleError).toBe('Title must be at least 5 characters');
    });

    it('handles title at max length', () => {
      const longTitle = 'a'.repeat(100);
      validateField('title', longTitle, null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.titleError).toBe(
        'Title cannot be more than 100 characters',
      );
    });

    it('accepts valid title', () => {
      validateField('title', 'Valid Title', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.titleError).toBe('');
    });
  });

  describe('Content Validation', () => {
    it('handles empty content', () => {
      validateField('content', '', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.contentError).toBe('Content cannot be blank');
    });

    it('handles content too short', () => {
      validateField('content', 'Short content', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.contentError).toBe(
        'Post must be at least 200 characters',
      );
    });

    it('accepts valid content', () => {
      const validContent = 'a'.repeat(200);
      validateField('content', validContent, null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.contentError).toBe('');
    });
  });

  describe('Image URL Validation', () => {
    it('handles invalid URL format', () => {
      validateField('imageURL', 'not-a-url', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageURLError).toBe('Please enter a valid image URL');
    });

    it('accepts valid image URLs', () => {
      const validURLs = [
        'https://example.com/image.jpg',
        'http://example.com/image.png',
        'https://example.com/image.jpeg',
        'https://example.com/image.gif',
        'https://example.com/image.svg',
        'https://example.com/image.webp',
      ];

      validURLs.forEach((url) => {
        validateField('imageURL', url, null, mockSetFormErrors);
        const updateFn = mockSetFormErrors.mock.calls.at(-1)[0];
        const newState = updateFn({});
        expect(newState.imageURLError).toBe('');
      });
    });

    it('handles URLs with query parameters', () => {
      validateField(
        'imageURL',
        'https://example.com/image.jpg?size=large',
        null,
        mockSetFormErrors,
      );
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageURLError).toBe('');
    });
  });

  describe('Image Alt Text Validation', () => {
    it('handles empty alt text', () => {
      validateField('imageAltText', '', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageAltTextError).toBe('Alt text cannot be blank');
    });

    it('handles alt text at max length', () => {
      const longAltText = 'a'.repeat(50);
      validateField('imageAltText', longAltText, null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageAltTextError).toBe(
        'Alt text cannot be more than 50 characters',
      );
    });

    it('accepts valid alt text', () => {
      validateField('imageAltText', 'Valid alt text', null, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.imageAltTextError).toBe('');
    });
  });

  it('maintains existing errors when validating a single field', () => {
    const existingErrors = {
      titleError: 'Existing title error',
      contentError: 'Existing content error',
    };

    validateField('imageURL', 'invalid-url', null, mockSetFormErrors);
    const updateFn = mockSetFormErrors.mock.calls[0][0];
    const newState = updateFn(existingErrors);

    expect(newState).toEqual({
      ...existingErrors,
      imageURLError: 'Please enter a valid image URL',
    });
  });
});
