import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../util/connect';
import { fetchGame as fetchGameAction } from './ducks';
import { Loading } from '../components';
import './GameDetail.scss';

class GameDetail extends PureComponent {
  componentWillMount() {
    const { fetchGame, match: { params } } = this.props;

    fetchGame(params.gameId);
  }

  renderListString(collection) {
    return collection.join(', ');
  }

  renderGameMessage() {
    const { game: { minPlayers, maxPlayers } } = this.props;

    return (minPlayers === 1 && maxPlayers === 1)
      ? '1 player'
      : `${minPlayers} - ${maxPlayers} players`;
  }

  render() {
    const { game, isLoading, history, error } = this.props;

    if (error) {
      history.push('/error');

      return null;
    }

    if (isLoading || !game) {
      return <Loading />;
    }

    const { name, year, categories, mechanics, publishers, artists } = game;

    return (
      <div className="game">
        <h2 className="game__name">{name}</h2>
        <h3 className="game__year">{year}</h3>

        <div className="game__attribute-collection">
          <strong className="game__collection-type">{`Categor${categories.length > 1 ? 'ies: ' : 'y: '}`}</strong>
          {this.renderListString(categories)}
        </div>

        <h4 className="game__players">{this.renderGameMessage()}</h4>

        <button className="game__add-button">Add to list</button>

        <img src={game.image} alt={game.name} className="game__image" />

        <p>{game.description}</p>

        <div className="game__attribute-collection">
          <strong className="game__collection-type">{`Mechanic${mechanics.length > 1 ? 's: ' : ': '}`}</strong>
          {this.renderListString(mechanics)}
        </div>
        <div className="game__attribute-collection">
          <strong className="game__collection-type">{`Artist${artists.length > 1 ? 's: ' : ': '}`}</strong>
          {this.renderListString(artists)}
        </div>
        <div className="game__attribute-collection">
          <strong className="game__collection-type">{`Publisher${publishers.length > 1 ? 's: ' : ': '}`}</strong>
          {this.renderListString(publishers)}
        </div>
      </div>
    );
  }
}

GameDetail.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

GameDetail.defaultProps = {
  game: null,
  error: null,
};

const mapStateToProps = state => ({
  isLoading: state.gameDetail.isLoading,
  error: state.gameDetail.error,
  game: state.gameDetail.game,
});

const mapDispatchToProps = dispatch => ({
  fetchGame: gameId => dispatch(fetchGameAction(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps, GameDetail);
