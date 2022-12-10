import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import Button from 'components/Button';
import css from './ImageGallery.module.css';
import { formatResponse } from 'service';

import Api from 'service';

const api = new Api();

const modalPortal = document.querySelector('#modal');

const galleryStatus = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: '',
    showModal: false,
    hits: [],
    totalHits: 0,
    forModal: null,
    status: galleryStatus.idle,
  };

  componentDidMount() {
    this.setState({ query: this.props.query });
  }

  componentDidUpdate(pervProps, prevState) {
    if (pervProps.query !== this.props.query) {
      this.setState({ query: this.props.query });
    }

    if (prevState.query !== this.state.query) {
      this.createRequest(this.state.query);
    }
  }

  createRequest = query => {
    this.setState({ status: galleryStatus.pending });
    api.reset();
    api.setQuery(query);
    api
      .makeRequest()
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState({
          hits: hits.map(element => formatResponse(element)),
          totalHits,
          status: galleryStatus.resolved,
        });
      })
      .catch(() => {
        this.setState({ status: galleryStatus.rejected });
      });
  };

  openModal = event => {
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
    api.makeRequest().then(({ hits }) =>
      this.setState(pervState => ({
        hits: [
          ...pervState.hits,
          ...hits.map(element => formatResponse(element)),
        ],
      }))
    );
  };

  render() {
    // console.log('state for ImageGallery: ', this.state);
    // console.log('props for ImageGallery: ', this.props);

    const { showModal, hits, totalHits, forModal, status } = this.state;

    if (status === galleryStatus.idle) {
      return null;
    }

    if (status === galleryStatus.pending) {
      return (
        <MagnifyingGlass
          visible={true}
          height="180"
          width="180"
          ariaLabel="MagnifyingGlass-loading"
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      );
    }

    if (status === galleryStatus.rejected) {
      return toast.error('Something went wrong :(');
    }

    if (status === galleryStatus.resolved) {
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
}
