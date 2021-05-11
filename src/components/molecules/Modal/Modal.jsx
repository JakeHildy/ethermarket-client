import React from 'react';
import './Modal.scss';
import ButtonDanger from './../../atoms/ButtonDanger/ButtonDanger';
import ButtonSecondary from './../../atoms/ButtonSecondary/ButtonSecondary';

function Modal({ hideModal, text, cb }) {
  const handleAction = () => {
    cb();
    hideModal();
  };

  return (
    <div className="modal">
      <div className="modal__popup">
        <h3 className="modal__popup-text">{text}</h3>
        <div className="modal__buttons">
          <div className="modal__buttons--cancel">
            <ButtonSecondary label="Cancel" handleClick={hideModal} />
          </div>
          <div className="modal__buttons--action">
            <ButtonDanger label="Delete" handleClick={handleAction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
