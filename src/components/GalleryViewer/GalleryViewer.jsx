import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Button from 'components/Button';

const modalPortal = document.querySelector('#modal');

export default class GalleryViewer extends Component {
  static propTypes = {
    hits: PropTypes.array,
    totalHits: PropTypes.number,
    onLoadMore: PropTypes.func,
  };

  state = {
    modalElement: null,
  };

  componentDidMount() {
    toast.success(`Hooray! We found ${this.props.totalHits} images.`);
  }

  componentDidUpdate(prevProps) {
    const { hits, totalHits } = this.props;
    if (prevProps.hits.length !== hits.length) {
      if (hits.length === totalHits) {
        toast.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  }

  openModal = id => {
    const modalElement = this.props.hits.find(
      element => element.id === Number(id)
    );
    this.setState({ modalElement });
  };

  closeModal = () => {
    this.setState({ modalElement: null });
  };

  render() {
    const { hits, totalHits, onLoadMore } = this.props;
    const { modalElement } = this.state;

    return (
      <>
        <ImageGallery hits={hits} onClick={this.openModal} />
        {hits.length < totalHits && <Button onClick={onLoadMore} />}
        {modalElement &&
          createPortal(
            <Modal
              largeImage={modalElement.largeImageURL}
              description={modalElement.tags}
              onClose={this.closeModal}
            />,
            modalPortal
          )}
      </>
    );
  }
}
