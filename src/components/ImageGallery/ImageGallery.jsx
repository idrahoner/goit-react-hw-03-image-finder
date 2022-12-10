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

  toggleModal = event => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    console.log('event: ', event);
    console.log('event.currentTarget: ', event.currentTarget);
    console.log('event.target: ', event.target);
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

    const { showModal, showLoader, hits, totalHits } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          {hits.map(element => (
            <ImageGalleryItem
              key={element.id}
              webImage={element.webformatURL}
              description={element.tags}
              onClick={this.toggleModal}
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
