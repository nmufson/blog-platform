import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiTextBoxEditOutline } from '@mdi/js';
import { mdiContentSaveCheckOutline } from '@mdi/js';

const EditDeleteIcons = ({
  setIsModalOpen,
  setModalType,
  setIsEditing,
  isEditing,
  updatePost,
}) => {
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleSaveClick = async () => {
    await updatePost();
    setIsEditing(false);
  };

  return (
    <>
      {/* Edit Icon */}
      {isEditing ? (
        <Icon
          onClick={handleSaveClick}
          style={{ cursor: 'pointer' }}
          path={mdiContentSaveCheckOutline}
          size={1}
        />
      ) : (
        <Icon
          onClick={handleEditClick}
          style={{ cursor: 'pointer' }}
          path={mdiTextBoxEditOutline}
          size={1}
        />
      )}

      {/* Delete Icon */}
      <Icon
        onClick={handleDeleteClick}
        style={{ cursor: 'pointer' }}
        path={mdiTrashCanOutline}
        size={1}
      />
    </>
  );
};

export default EditDeleteIcons;
