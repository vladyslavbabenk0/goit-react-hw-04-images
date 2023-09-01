import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.toggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      return this.props.toggleModal();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    const {
      largeImage: { src },
    } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
