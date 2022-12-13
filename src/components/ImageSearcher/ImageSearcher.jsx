import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

import GalleryViewer from 'components/GalleryViewer';
import Loader from 'components/Loader';
import { fetchImages, formatResponse, searchStatus } from 'service';

const { idle, pending, resolved } = searchStatus;

export default class ImageSearcher extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: '',
    page: 1,
    hits: [],
    totalHits: 0,
    status: idle,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: propsQuery } = this.props;
    const { query, page } = this.state;

    if (prevProps.query !== propsQuery) {
      this.prepareState(propsQuery);
    }

    if (prevState.query !== query || prevState.page !== page) {
      this.makeRequest(query, page);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async makeRequest(query, page) {
    try {
      const { hits, totalHits } = await fetchImages({ query, page });

      if (!totalHits) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prevState => ({
        hits: [
          ...prevState.hits,
          ...hits.map(element => formatResponse(element)),
        ],
        totalHits,
        status: resolved,
      }));
    } catch (error) {
      this.setState({ status: idle });
      toast.error(error.message);
    }
  }

  prepareState(query) {
    this.setState({
      query,
      page: 1,
      hits: [],
      totalHits: 0,
      status: pending,
    });
  }

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
