import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import Button from 'components/Button';
import css from './ImageGallery.module.css';

import Api from 'service';

const api = new Api();

const modalPortal = document.querySelector('#modal');

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: '',
    showModal: false,
    showLoader: false,
    hits: [],
    totalHits: 0,
    forModal: null,
  };

  componentDidMount() {
    this.setState({ query: this.props.query, showLoader: true });
    api.setQuery(this.props.query);
    api
      .makeRequest()
      .then(({ hits, totalHits }) => this.setState({ hits, totalHits }))
      .finally(() => {
        this.setState({ showLoader: false });
      });
  }

  componentDidUpdate(pervProps) {
    if (pervProps.query !== this.props.query) {
      this.setState({ query: this.props.query });
      api.reset();
      api.setQuery(this.props.query);
      api
        .makeRequest()
        .then(({ hits, totalHits }) => this.setState({ hits, totalHits }))
        .finally(() => {
          this.setState({ showLoader: false });
        });
    }
  }

  openModal = event => {
    console.log('event.currentTarget.id: ', typeof event.currentTarget.id);
    const modalElement = this.state.hits.find(
      element => element.id === Number(event.currentTarget.id)
    );
    this.toggleModal();
    this.setState({ forModal: modalElement });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  loadMore = () => {
    api.increasePage();
    api
      .makeRequest()
      .then(({ hits }) =>
        this.setState(pervState => ({ hits: [...pervState.hits, ...hits] }))
      );
  };

  render() {
    // console.log('state for ImageGallery: ', this.state);
    // console.log('props for ImageGallery: ', this.props);

    const { showModal, showLoader, hits, totalHits, forModal } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          {hits.map(element => (
            <ImageGalleryItem
              key={element.id}
              id={element.id}
              webImage={element.webformatURL}
              description={element.tags}
              onClick={this.openModal}
            />
          ))}
        </ul>
        <MagnifyingGlass
          visible={showLoader}
          height="180"
          width="180"
          ariaLabel="MagnifyingGlass-loading"
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
        {hits.length < totalHits && <Button onClick={this.loadMore} />}
        {showModal &&
          createPortal(
            <Modal
              largeImage={forModal.largeImageURL}
              description={forModal.tags}
              onClose={this.toggleModal}
            />,
            modalPortal
          )}
      </>
    );
  }
}
