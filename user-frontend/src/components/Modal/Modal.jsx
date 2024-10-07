import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText }) => {
  if (!isOpen) return null;

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
