import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../../util/connect';
import { search as searchAction } from './ducks';
import './Search.scss';

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

  onResultClick = (gameId) => {
    this.props.history.push(`/games/${gameId}`);
  }

  get searchResults() {
    const { searchResults } = this.props;

    if (!searchResults.length) {
      return null;
    }

    return (
      <ul className="search__results">
        {searchResults.map(result => (
          // TODO - Research mobile-specific accesibility compliment to onClick
          // eslint-disable-next-line
          <li
            key={result.id}
            onClick={() => this.onResultClick(result.id)}
          >
            {result.name} - {result.year}
          </li>
        ))
      }
      </ul>
    );
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
        {this.searchResults}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
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
