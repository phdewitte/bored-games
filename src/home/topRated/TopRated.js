import React from 'react';
import PropTypes from 'prop-types';
import './TopRated.css';

const TopRated = ({ topRated, onViewGameDetailClick }) => {
  const gameElements = topRated.map((game) => {
    return (
      // TODO - Research mobile-specific accesibility compliment to onClick
      // eslint-disable-next-line
      <div className="top-rated__card" key={game.id} onClick={() => onViewGameDetailClick(game.id)}>
        <img className="top-rated__thumbnail" src={game.thumbnail} alt={game.name} />
        <h2 className="top-rated__name">{game.name}</h2>
        <h3 className="top-rated__year">{game.year}</h3>
      </div>
    );
  });

  return (
    <div className="top-rated">
      <h2 className="top-rated__header">BoardGameGeek Hotness&hellip;</h2>
      <div className="top-rated__list">
        {gameElements}
      </div>
    </div>
  );
};

TopRated.propTypes = {
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      rank: PropTypes.number,
      thumbnail: PropTypes.string,
      year: PropTypes.number,
    }),
  ).isRequired,
  onViewGameDetailClick: PropTypes.func.isRequired,
};

export default TopRated;
