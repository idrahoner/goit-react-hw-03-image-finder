import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import css from './ImageGallery.module.css';

// import Api from 'service';

// const api = new Api();

// console.log('Api: ', Api);
// console.log('Api.key: ', Api.key);

// console.log('api = new Api(): ', api);
// console.log('api.key: ', api.key);

// console.log('api.query: ', api.query);
// console.log('api.setQuery("hello, world")');
// api.setQuery('hello, world');

// console.log('setted api.query: ', api.query);

// console.log('api.page: ', api.page);
// console.log('api.increasePage()');
// api.increasePage();
// console.log('increased api.page: ', api.page);

const modalPortal = document.querySelector('#modal');

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: '',
    showModal: false,
  };

  componentDidMount() {
    // console.log('componentDidMount()');

    this.setState({ query: this.props.query });
  }

  componentDidUpdate(pervProps) {
    // console.log('componentDidUpdate()');
    if (pervProps.query !== this.props.query) {
      this.setState({ query: this.props.query });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    // console.log('state for ImageGallery: ', this.state);

    const { query, showModal } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          <ImageGalleryItem
            webImage={query}
            description={query}
            onClick={this.toggleModal}
          />
        </ul>
        {showModal &&
          createPortal(
            <Modal
              largeImage="blablabla"
              description="blablabla"
              onClose={this.toggleModal}
            />,
            modalPortal
          )}
      </>
    );
  }
}
