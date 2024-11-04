import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode';

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

describe('useAuth', () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    removeItem: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(Date, 'now').mockImplementation(() => 1000 * 1000);
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
  });

  it('sets user null when no token exists', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
  });

  it('sets user when valid token exists', async () => {
    const mockToken = 'valid.token.here';
    const mockDecodedToken = {
      id: 1,
      username: 'testuser',
      canPost: true,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    };

    mockLocalStorage.getItem.mockReturnValue(mockToken);
    jwtDecode.mockReturnValue(mockDecodedToken);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual({
      id: 1,
      username: 'testuser',
      canPost: true,
      token: mockToken,
    });
  });

  it('removes expired token and sets user to null', async () => {
    const mockToken = 'expired.token.here';
    const mockDecodedToken = {
      exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    };

    mockLocalStorage.getItem.mockReturnValue(mockToken);
    jwtDecode.mockReturnValue(mockDecodedToken);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('handles invalid token', async () => {
    mockLocalStorage.getItem.mockReturnValue('invalid.token');
    jwtDecode.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
