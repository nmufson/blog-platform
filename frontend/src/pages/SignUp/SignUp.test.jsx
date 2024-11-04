import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import { signUpUser } from '../../services/signUpService';
import { validateField } from './SignUpUtils';

vi.mock('../../services/signUpService', () => ({
  signUpUser: vi.fn(),
  checkEmailAvailability: vi.fn(),
  checkUsernameAvailability: vi.fn(),
}));

vi.mock('./SignUpUtils', () => ({
  validateField: vi.fn(),
}));

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((content) => content),
  },
}));

describe('SignUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    validateField.mockResolvedValue({});
  });

  it('renders all form fields', () => {
    render(<SignUp />);

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password:$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author Code:/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('validates on blur', async () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.blur(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    });

    expect(validateField).toHaveBeenCalled();
  });

  it('handles form submission', async () => {
    signUpUser.mockResolvedValueOnce({ token: 'fake-token' });

    const { container } = render(<SignUp />);

    const form = container.querySelector('#signUpForm');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(validateField).toHaveBeenCalled();
    });
  });

  it('handles successful signup', async () => {
    const mockToken = 'fake-token';
    signUpUser.mockResolvedValueOnce({ token: mockToken });

    const { container } = render(<SignUp />);

    const form = container.querySelector('#signUpForm');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(window.location.href).toBe('http://localhost:3000/');
    });
  });

  it('handles signup errors', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    signUpUser.mockRejectedValueOnce(new Error('Signup failed'));

    const { container } = render(<SignUp />);

    const form = container.querySelector('#signUpForm');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });
});
