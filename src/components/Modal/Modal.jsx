import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalEl = document.querySelector('#modal');

function Modal({ closeModal, largeImageURL, tags }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
  }, [closeModal]);

  useEffect(() => {
    document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  const closeModalOnClick = ({ key, target, currentTarget }) => {
    if (key === 'Escape' || target === currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={closeModalOnClick}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalEl
  );
}

export default Modal;
