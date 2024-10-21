import Icon from '@mdi/react';
import React from 'react';
import PropTypes from 'prop-types';
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

EditDeleteIcons.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default EditDeleteIcons;
