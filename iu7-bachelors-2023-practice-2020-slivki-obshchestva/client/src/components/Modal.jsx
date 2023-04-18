import React from 'react';
import PropTypes from 'prop-types';

function Modal({ children, onClose }) {
  return (
    <div className="modal">
      <div
        className="modal__close"
        onClick={onClose}
        role="button"
        tabIndex={0}
      >
        <i className="far fa-times-circle" />
      </div>
      {children}
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
