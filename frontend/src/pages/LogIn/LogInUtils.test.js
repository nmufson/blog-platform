import { describe, it, expect, vi } from 'vitest';
import { validateLogin, handleAuthError } from './LogInUtils';

describe('validateLogin', () => {
  it('returns error for empty email', () => {
    const result = validateLogin('', 'password123@');
    expect(result.emailError).toBe('Please include email.');
  });

  it('returns error for invalid email format', () => {
    const result = validateLogin('invalidemail', 'password123@');
    expect(result.emailError).toBe('Please include valid email.');
  });

  it('returns error for empty password', () => {
    const result = validateLogin('test@example.com', '');
    expect(result.passwordError).toBe('Please include password.');
  });

  it('returns no errors for valid input', () => {
    const result = validateLogin('test@example.com', 'password123@');
    expect(result).toEqual({});
  });
});

describe('handleAuthError', () => {
  it('handles email-related errors', () => {
    const setFormErrors = vi.fn();
    handleAuthError(new Error('Invalid email'), setFormErrors);

    expect(setFormErrors).toHaveBeenCalled();
    const updateFn = setFormErrors.mock.calls[0][0];
    const newState = updateFn({});
    expect(newState.emailError).toBe('Invalid email. Please try again.');
  });

  it('handles password-related errors', () => {
    const setFormErrors = vi.fn();
    handleAuthError(new Error('Invalid password'), setFormErrors);

    expect(setFormErrors).toHaveBeenCalled();
    const updateFn = setFormErrors.mock.calls[0][0];
    const newState = updateFn({});
    expect(newState.passwordError).toBe(
      'Incorrect password. Please try again.',
    );
  });

  it('handles unexpected errors', () => {
    const setFormErrors = vi.fn();
    handleAuthError(new Error('Unknown error'), setFormErrors);

    expect(setFormErrors).toHaveBeenCalled();
    const updateFn = setFormErrors.mock.calls[0][0];
    const newState = updateFn({});
    expect(newState.passwordError).toBe(
      'An unexpected error occurred. Please try again later.',
    );
  });
});
