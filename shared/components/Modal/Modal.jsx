import React from 'react';
import styles from './Modal.module.css';

const Modal = ({
  isOpen,
  onConfirm,
  title,
  message,
  confirmText,
  closeModal,
}) => {
  if (!isOpen) return null;

  const onClose = () => {
    closeModal();
  };

  return (
    <>
      <div className={styles.Backdrop} onClick={onClose} />
      <div className={styles.Modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.ButtonGroup}>
          <button onClick={onClose} className={styles.CancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.ConfirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
