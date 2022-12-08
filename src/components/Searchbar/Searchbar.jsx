import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Searcbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    input: '',
  };

  handleChange = event => {
    this.setState({ input: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { input } = this.state;
    this.props.onSubmit(input);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={input}
          />
        </form>
      </header>
    );
  }
}
