import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSearch = data => {
    this.setState({ query: data });
  };

  render() {
    // console.log('App this.state: ', this.state.query);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
