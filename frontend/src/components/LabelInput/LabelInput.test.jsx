import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LabelInput from './LabelInput';

describe('LabelInput', () => {
  const defaultProps = {
    type: 'text',
    name: 'username',
    value: '',
    onChange: vi.fn(),
    formErrors: {},
  };

  it('renders input with basic props', () => {
    render(<LabelInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'username');
  });

  it('renders label when provided', () => {
    render(<LabelInput {...defaultProps} label="Username" />);

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<LabelInput {...defaultProps} />);

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<LabelInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('handles onBlur events', () => {
    const handleBlur = vi.fn();
    render(<LabelInput {...defaultProps} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error message when present', () => {
    render(
      <LabelInput
        {...defaultProps}
        formErrors={{ usernameError: 'Invalid username' }}
      />,
    );

    expect(screen.getByText('Invalid username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('input-error');
  });

  it('applies maxLength when provided', () => {
    render(<LabelInput {...defaultProps} maxLength={10} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
  });

  it('uses custom placeholder when provided', () => {
    render(<LabelInput {...defaultProps} placeholder="Enter your username" />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter your username',
    );
  });

  it('uses name as placeholder when no placeholder provided', () => {
    render(<LabelInput {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'username',
    );
  });

  it('works with different input types', () => {
    render(<LabelInput {...defaultProps} type="password" name="password" />);

    const input = screen.getByPlaceholderText('password');
    expect(input).toHaveAttribute('type', 'password');
  });
});
