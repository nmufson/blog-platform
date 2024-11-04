import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../hooks/useModal/useModal', () => ({
  useModal: () => ({
    isModalOpen: false,
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

vi.mock('../Modal/Modal', () => ({
  default: ({ onConfirm }) => (
    <div data-testid="modal">
      <button onClick={onConfirm} data-testid="confirm-logout">
        Confirm Logout
      </button>
    </div>
  ),
}));

describe('Header', () => {
  const mockUser = {
    username: 'testuser',
  };

  const defaultProps = {
    user: null,
    setUser: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login link when user is not logged in', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.queryByText('testuser')).not.toBeInTheDocument();
  });

  it('renders user menu when user is logged in', () => {
    render(<Header {...defaultProps} user={mockUser} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
  });

  it('toggles dropdown menu when user button is clicked', async () => {
    render(<Header {...defaultProps} user={mockUser} />);

    const userButton = screen.getByText('testuser');
    fireEvent.click(userButton);

    expect(screen.getByText('Log Out')).toBeInTheDocument();

    fireEvent.click(userButton);
    await waitFor(() => {
      expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(<Header {...defaultProps} user={mockUser} />);

    fireEvent.click(screen.getByText('testuser'));
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
    });
  });

  it('handles logout flow correctly', async () => {
    const mockSetUser = vi.fn();
    const localStorageSpy = vi.spyOn(Storage.prototype, 'removeItem');

    render(<Header user={mockUser} setUser={mockSetUser} />);

    fireEvent.click(screen.getByText('testuser'));
    fireEvent.click(screen.getByText('Log Out'));

    fireEvent.click(screen.getByTestId('confirm-logout'));

    expect(localStorageSpy).toHaveBeenCalledWith('token');
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });

  it('renders navigation links correctly', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText("Nick's Blog")).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('keeps dropdown open when clicking inside dropdown area', () => {
    render(<Header {...defaultProps} user={mockUser} />);

    const userButton = screen.getByText('testuser');
    fireEvent.click(userButton);

    const dropdownButton = screen.getByText('Log Out');
    fireEvent.mouseDown(dropdownButton);

    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });
});
