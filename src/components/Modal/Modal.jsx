import { Component } from 'react';
import PropTypes from 'prop-types';
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
        <div className={css.modal}>
          <img
            src={this.props.largeImage}
            alt={this.props.description}
            width="300"
            height="200"
          />
        </div>
      </div>
    );
  }
}
