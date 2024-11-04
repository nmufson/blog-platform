import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onConfirm: vi.fn(),
    closeModal: vi.fn(),
    title: 'Test Modal',
    message: 'Test Message',
    confirmText: 'Confirm',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls closeModal when cancel button is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('calls closeModal when backdrop is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByRole('complementary'));
    expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
  });
});
