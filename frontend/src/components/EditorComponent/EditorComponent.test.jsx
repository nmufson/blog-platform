import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import EditorComponent from './EditorComponent';

vi.mock('@tinymce/tinymce-react', () => ({
  Editor: ({ value, onEditorChange }) => {
    return (
      <div data-testid="mock-editor">
        <textarea
          value={value}
          onChange={(e) => onEditorChange(e.target.value)}
          data-testid="editor-textarea"
        />
      </div>
    );
  },
}));

describe('EditorComponent', () => {
  it('renders with initial content', () => {
    const { getByTestId } = render(<EditorComponent content="Test content" />);

    const editor = getByTestId('mock-editor').querySelector('textarea');
    expect(editor.value).toBe('Test content');
  });

  it('calls onContentChange when content changes', () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <EditorComponent
        content="Initial content"
        onContentChange={handleChange}
      />,
    );

    fireEvent.change(getByTestId('editor-textarea'), {
      target: { value: 'New content' },
    });

    expect(handleChange).toHaveBeenCalledWith('New content');
  });

  it('works with default onContentChange prop', () => {
    const { getByTestId } = render(<EditorComponent content="Test content" />);

    const editor = getByTestId('mock-editor').querySelector('textarea');

    expect(() => {
      editor.value = 'New content';
      editor.dispatchEvent(new Event('change'));
    }).not.toThrow();
  });
});
