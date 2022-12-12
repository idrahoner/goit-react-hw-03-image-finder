import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

import GalleryViewer from 'components/GalleryViewer';
import Loader from 'components/Loader';
import { FindImageApi, formatResponse, searchStatus } from 'service';

const imageApi = new FindImageApi();

const { idle, pending, resolved } = searchStatus;

export default class ImageSearcher extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    hits: [],
    totalHits: 0,
    status: idle,
  };

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({
        hits: [],
        totalHits: 0,
        status: pending,
      });
      imageApi.setQuery(query);
      this.handleRequest();
    }
  }

  loadMore = () => {
    imageApi.increasePage();
    this.handleRequest(this.props.query);
  };

  handleRequest = () => {
    imageApi
      .makeRequest()
      .then(this.onSuccessRequest)
      .catch(error => {
        this.setState({ status: idle });
        toast.error(error.message);
      });
  };

  onSuccessRequest = ({ hits, totalHits }) => {
    this.setState(prevState => ({
      hits: [
        ...prevState.hits,
        ...hits.map(element => formatResponse(element)),
      ],
      totalHits,
      status: resolved,
    }));
  };

  render() {
    const { hits, totalHits, status } = this.state;

    if (status === idle) {
      return null;
    }

    if (status === pending) {
      return <Loader />;
    }

    if (status === resolved) {
      return (
        <GalleryViewer
          hits={hits}
          totalHits={totalHits}
          onLoadMore={this.loadMore}
        />
      );
    }
  }
}
