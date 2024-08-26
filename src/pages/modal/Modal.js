import React from 'react';
import './modal.css';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div
        className="darkBG"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsOpen(false);
          }
        }}
        role="button" // Add a role to indicate interactivity
        tabIndex={0} // Make it keyboard-focusable
      />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className="modalContent">Are you sure you want to delete the item?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
