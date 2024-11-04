import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditDeleteIcons from './EditDeleteIcons';
import {
  mdiTrashCanOutline,
  mdiTextBoxEditOutline,
  mdiContentSaveCheckOutline,
} from '@mdi/js';

vi.mock('@mdi/react', () => ({
  default: ({ path, onClick }) => (
    <svg data-testid={`icon-${path}`} onClick={onClick} />
  ),
}));

describe('EditDeleteIcons', () => {
  const defaultProps = {
    setIsModalOpen: vi.fn(),
    setModalType: vi.fn(),
    setIsEditing: vi.fn(),
    isEditing: false,
    updatePost: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders edit and delete icons when not editing', () => {
    render(<EditDeleteIcons {...defaultProps} />);

    expect(
      screen.getByTestId(`icon-${mdiTextBoxEditOutline}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`icon-${mdiTrashCanOutline}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(`icon-${mdiContentSaveCheckOutline}`),
    ).not.toBeInTheDocument();
  });

  it('renders save and delete icons when editing', () => {
    render(<EditDeleteIcons {...defaultProps} isEditing={true} />);

    expect(
      screen.getByTestId(`icon-${mdiContentSaveCheckOutline}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`icon-${mdiTrashCanOutline}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(`icon-${mdiTextBoxEditOutline}`),
    ).not.toBeInTheDocument();
  });

  it('handles edit icon click', () => {
    render(<EditDeleteIcons {...defaultProps} />);

    const editIcon = screen.getByTestId(`icon-${mdiTextBoxEditOutline}`);
    fireEvent.click(editIcon);

    expect(defaultProps.setIsEditing).toHaveBeenCalledWith(true);
  });

  it('handles delete icon click', () => {
    render(<EditDeleteIcons {...defaultProps} />);

    const deleteIcon = screen.getByTestId(`icon-${mdiTrashCanOutline}`);
    fireEvent.click(deleteIcon);

    expect(defaultProps.setModalType).toHaveBeenCalledWith('delete');
    expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(true);
  });

  it('handles save icon click', async () => {
    render(<EditDeleteIcons {...defaultProps} isEditing={true} />);

    const saveIcon = screen.getByTestId(`icon-${mdiContentSaveCheckOutline}`);
    await fireEvent.click(saveIcon);

    expect(defaultProps.updatePost).toHaveBeenCalled();
    expect(defaultProps.setIsEditing).toHaveBeenCalledWith(false);
  });

  it('calls updatePost and setIsEditing in correct order when saving', async () => {
    const calls = [];
    const updatePost = vi.fn().mockImplementation(() => {
      calls.push('updatePost');
      return Promise.resolve();
    });
    const setIsEditing = vi.fn().mockImplementation(() => {
      calls.push('setIsEditing');
    });

    render(
      <EditDeleteIcons
        {...defaultProps}
        isEditing={true}
        updatePost={updatePost}
        setIsEditing={setIsEditing}
      />,
    );

    const saveIcon = screen.getByTestId(`icon-${mdiContentSaveCheckOutline}`);
    await fireEvent.click(saveIcon);

    expect(calls).toEqual(['updatePost', 'setIsEditing']);
  });

  it('handles updatePost failure', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const updatePost = vi.fn().mockRejectedValue(new Error('Update failed'));

    render(
      <EditDeleteIcons
        {...defaultProps}
        isEditing={true}
        updatePost={updatePost}
      />,
    );

    const saveIcon = screen.getByTestId(`icon-${mdiContentSaveCheckOutline}`);
    await fireEvent.click(saveIcon);

    expect(defaultProps.setIsEditing).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
