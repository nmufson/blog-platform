import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateField } from './SignUpUtils';
import {
  checkEmailAvailability,
  checkUsernameAvailability,
} from '../../services/signUpService';

vi.mock('../../services/signUpService', () => ({
  checkEmailAvailability: vi.fn(),
  checkUsernameAvailability: vi.fn(),
}));

describe('SignUpUtils Validation', () => {
  let mockSetFormErrors;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetFormErrors = vi.fn();
    checkEmailAvailability.mockResolvedValue(false);
    checkUsernameAvailability.mockResolvedValue(false);
  });

  describe('Email Validation', () => {
    it('validates empty email', async () => {
      await validateField('email', '', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.emailError).toBe('Email cannot be blank');
    });

    it('validates invalid email format', async () => {
      await validateField('email', 'invalidemail', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.emailError).toBe('Invalid email format');
    });

    it('validates email availability', async () => {
      checkEmailAvailability.mockResolvedValueOnce(true);
      await validateField('email', 'test@example.com', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.emailError).toBe('Email already in use');
    });

    it('handles email availability check error', async () => {
      checkEmailAvailability.mockRejectedValueOnce(
        new Error('Could not check email availability'),
      );
      await validateField('email', 'test@example.com', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.emailError).toBe('Error checking email availability');
    });
  });

  describe('Username Validation', () => {
    it('validates empty username', async () => {
      await validateField('username', '', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.usernameError).toBe('Username cannot be blank');
    });

    it('validates username too short', async () => {
      await validateField('username', 'ab', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.usernameError).toBe(
        'Username must be at least 3 characters',
      );
    });

    it('validates username too long', async () => {
      await validateField('username', 'a'.repeat(16), {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.usernameError).toBe(
        'Username cannot be more than 15 characters',
      );
    });

    it('validates username availability', async () => {
      checkUsernameAvailability.mockResolvedValueOnce(true);
      await validateField('username', 'testuser', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.usernameError).toBe('Username already in use');
    });
  });

  describe('Password Validation', () => {
    it('validates empty password', async () => {
      await validateField('password', '', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.passwordError).toBe('Password cannot be blank');
    });

    it('validates password length', async () => {
      await validateField('password', 'short', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.passwordError).toBe(
        'Password must be at least 8 characters',
      );
    });

    it('validates password number requirement', async () => {
      await validateField('password', 'Password@', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.passwordError).toBe('Password must contain a number');
    });

    it('validates password special character requirement', async () => {
      await validateField('password', 'Password1', {}, mockSetFormErrors);
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.passwordError).toBe(
        'Password must contain a special character',
      );
    });
  });

  describe('Confirm Password Validation', () => {
    it('validates matching passwords', async () => {
      const formData = { password: 'Password1@' };
      await validateField(
        'confirmPassword',
        'Password1@',
        formData,
        mockSetFormErrors,
      );
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.confirmPasswordError).toBe('');
    });

    it('validates non-matching passwords', async () => {
      const formData = { password: 'Password1@' };
      await validateField(
        'confirmPassword',
        'DifferentPassword1@',
        formData,
        mockSetFormErrors,
      );
      const updateFn = mockSetFormErrors.mock.calls[0][0];
      const newState = updateFn({});
      expect(newState.confirmPasswordError).toBe('Passwords do not match');
    });
  });
});
