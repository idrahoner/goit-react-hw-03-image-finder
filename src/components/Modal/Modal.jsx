import { Component } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineXCircle } from 'react-icons/hi2';
import css from './Modal.module.css';

const ESCAPE_KEY = 'Escape';

export default class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    if (event.currentTarget === event.target || event.code === ESCAPE_KEY) {
      event.preventDefault();
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.closeModal}>
        <HiOutlineXCircle
          color="white"
          size="2em"
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            pointerEvents: 'none',
          }}
        />
        <div className={css.modal}>
          <img src={this.props.largeImage} alt={this.props.description} />
        </div>
      </div>
    );
  }
}
