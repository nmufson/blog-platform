import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModal } from './useModal';

describe('useModal', () => {
  it('initializes with modal closed and no type', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.modalType).toBe(null);
  });

  it('opens modal with specified type', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal('delete');
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe('delete');
  });

  it('closes modal and resets type', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal('delete');
    });

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.modalType).toBe(null);
  });

  it('can handle different modal types', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal('edit');
    });
    expect(result.current.modalType).toBe('edit');

    act(() => {
      result.current.openModal('delete');
    });
    expect(result.current.modalType).toBe('delete');
  });

  it('handles multiple open/close cycles', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal('edit');
    });
    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe('edit');

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.modalType).toBe(null);

    act(() => {
      result.current.openModal('delete');
    });
    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe('delete');
  });
});
