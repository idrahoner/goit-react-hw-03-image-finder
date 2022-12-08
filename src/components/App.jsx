import { Component } from 'react';

import Searchbar from 'components/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  handleSearch = data => {
    this.setState({ query: data });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearch} />
      </div>
    );
  }
}
