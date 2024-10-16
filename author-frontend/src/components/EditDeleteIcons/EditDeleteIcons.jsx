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
          className="icon"
        />
      ) : (
        <Icon
          onClick={handleEditClick}
          style={{ cursor: 'pointer' }}
          path={mdiTextBoxEditOutline}
          className="icon"
        />
      )}

      {/* Delete Icon */}
      <Icon
        onClick={handleDeleteClick}
        style={{ cursor: 'pointer' }}
        path={mdiTrashCanOutline}
        className="icon"
      />
    </>
  );
};

export default EditDeleteIcons;
