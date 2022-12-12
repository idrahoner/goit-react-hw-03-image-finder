import { Component } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

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
    const normalizedInput = input.trim().toLowerCase();
    if (normalizedInput) {
      this.props.onSubmit(normalizedInput);
    }
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
            <HiMagnifyingGlass size="2em" color="black" />
          </button>

          <input
            className={css.searchFormInput}
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
