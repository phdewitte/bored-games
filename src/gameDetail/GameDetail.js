import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../util/connect';
import { fetchGame as fetchGameAction } from './ducks.js';
import './GameDetail.css';

class GameDetail extends PureComponent {
  componentWillMount() {
    const { fetchGame, match: { params } } = this.props;

    fetchGame(params.gameId);
  }

  render() {
    const { game } = this.props;

    if (!game) {
      return <div>Loading...</div>;
    }

    const { name, year, categories, mechanics, publishers, artists } = game;

    return (
      <div className="game">
        <h2 className="game__name">{name}</h2>
        <h3 className="game__year">{year}</h3>

        <div className="game__attribute-collection">
          {`Categor${categories.length > 1 ? 'ies:' : 'y:'}`}
          {categories.map(category => (
            <span key={category} className="game__attribute-collection-member">{category}</span>
          ))}
        </div>
        <div className="game__attribute-collection">
          {`Mechanic${mechanics.length > 1 ? 's:' : ':'}`}
          {mechanics.map(mechanic => (
            <span key={mechanic} className="game__attribute-collection-member">{mechanic}</span>
          ))}
        </div>
        <div className="game__attribute-collection">
          {`Artist${artists.length > 1 ? 's:' : ':'}`}
          {artists.map(artist => (
            <span key={artist} className="game__attribute-collection-member">{artist}</span>
          ))}
        </div>
        <div className="game__attribute-collection">
          {`Publisher${publishers.length > 1 ? 's:' : ':'}`}
          {publishers.map(publisher => (
            <span key={publisher} className="game__attribute-collection-member">{publisher}</span>
          ))}
        </div>

        <h5 className="game__players">{game.minPlayers} - {game.maxPlayers} players</h5>

        <button className="game__add-button">Add to list</button>

        <img src={game.thumbnail} alt={game.name} />

        {/* NEED TO ESCAPE SPECIAL XML CHARACTERS */}
        <p>{game.description}</p>
      </div>
    );
  }
}

GameDetail.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    year: PropTypes.number,
    minPlayers: PropTypes.number,
    maxPlayers: PropTypes.number,
  }),
  fetchGame: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gameId: PropTypes.string,
    }),
  }).isRequired,
};

GameDetail.defaultProps = {
  game: null,
};

const mapStateToProps = state => ({
  isLoading: state.gameDetail.isLoading,
  game: state.gameDetail.game,
});

const mapDispatchToProps = dispatch => ({
  fetchGame: gameId => dispatch(fetchGameAction(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps, GameDetail);
