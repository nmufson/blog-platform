import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './LogIn';
import { logInUser } from '../../services/LogInService';
import { validateLogin, handleAuthError } from './LogInUtils';

vi.mock('../../services/LogInService', () => ({
  logInUser: vi.fn(),
}));

vi.mock('./LogInUtils', () => ({
  validateLogin: vi.fn(),
  handleAuthError: vi.fn(),
}));

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((content) => content),
  },
}));

describe('LogIn', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };

  const originalWindow = window.location;
  let locationMock;

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    locationMock = {
      href: '',
    };
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: originalWindow,
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    validateLogin.mockReturnValue({});
    locationMock.href = '';
  });

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>,
    );
  };

  it('renders login form', () => {
    renderLogin();

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByText(/Create New Account/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123@' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123@');
  });

  it('validates form before submission', async () => {
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.click(submitButton);

    expect(validateLogin).toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123@' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(logInUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123@',
      );
    });
  });

  it('handles successful login', async () => {
    const mockToken = 'fake-token';
    logInUser.mockResolvedValueOnce({ token: mockToken });

    renderLogin();

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123@' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(window.location.href).toBe('/home');
    });
  });

  it('handles login errors', async () => {
    const mockError = new Error('Invalid credentials');
    logInUser.mockRejectedValueOnce(mockError);

    renderLogin();

    const submitButton = screen.getByRole('button', { name: /Log In/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleAuthError).toHaveBeenCalledWith(
        mockError,
        expect.any(Function),
      );
    });
  });
});
