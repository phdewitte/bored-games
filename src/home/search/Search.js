import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../../util/connect';
import { search as searchAction } from './ducks';
import './Search.css';

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
    };
  }

  onChange = (event) => {
    const inputText = event.target.value;

    this.setState({ inputText });
  }

  onSubmit = (event) => {
    const { inputText } = this.state;
    const { isLoading, search } = this.props;

    event.preventDefault();

    if (inputText && !isLoading) {
      search(inputText);
    }
  };

  get searchResults() {
    const { searchResults } = this.props;

    return searchResults.map(result => <li key={result.id}>{result.name} - {result.year}</li>);
  }

  render() {
    return (
      <div className="search">
        <h2 className="search__header">Search for a game</h2>
        <form onSubmit={this.onSubmit} className="search__form">
          <label htmlFor="searchInput" aria-label="Search Input">
            <input
              id="searchInput"
              type="text"
              placeholder="Search..."
              className="search__input"
              value={this.state.inputText}
              onChange={this.onChange}
            />
          </label>
        </form>
        <ul className="search__results">
          {this.searchResults}
        </ul>
      </div>
    );
  }
}

Search.propTypes = {
  isLoading: PropTypes.bool,
  search: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      year: PropTypes.number,
    }),
  ),
};

Search.defaultProps = {
  isLoading: false,
  searchResults: [],
};

const mapStateToProps = state => ({
  isLoading: state.search.isLoading,
  searchResults: state.search.searchResults,
});

const mapDispatchToProps = dispatch => ({
  search: searchInput => dispatch(searchAction(searchInput)),
});

export default connect(mapStateToProps, mapDispatchToProps, Search);
