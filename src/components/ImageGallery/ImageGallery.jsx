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
    error: null,
    hits: [],
    totalHits: 0,
    modalImage: null,
    status: galleryStatus.idle,
  };

  componentDidUpdate(pervProps, pervState) {
    if (pervProps.query !== this.props.query) {
      // console.log('changed props');
      this.setState({ status: galleryStatus.pending });
      api.setQuery(this.props.query);
      api
        .makeRequest()
        .then(({ hits, totalHits }) => {
          this.setState({
            hits: hits.map(element => formatResponse(element)),
            totalHits,
            status: galleryStatus.resolved,
          });
        })
        .catch(error => {
          this.setState({ error, status: galleryStatus.rejected });
        });
    }
  }

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

  openModal = event => {
    const modalElement = this.state.hits.find(
      element => element.id === Number(event.currentTarget.id)
    );
    this.setState({ modalImage: modalElement });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { hits, totalHits, modalImage, status, error } = this.state;

    console.log(this.state);
    // console.log(this.props);

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
          wrapperStyle={{
            margin: 'auto',
          }}
        />
      );
    }

    if (status === galleryStatus.rejected) {
      return toast.error(error.message);
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
          {modalImage &&
            createPortal(
              <Modal
                largeImage={modalImage.largeImageURL}
                description={modalImage.tags}
                onClose={this.closeModal}
              />,
              modalPortal
            )}
        </>
      );
    }
  }
}
