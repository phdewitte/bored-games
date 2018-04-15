import React from 'react';
import PropTypes from 'prop-types';
import './TopRated.css';

const TopRated = ({ topRated, onViewGameDetailClick }) => {
  // TODO: Update limit to a config setting instead of hardcoding
  const topRatedSelection = topRated.slice(0, 25);

  const gameElements = topRatedSelection.map((game) => {
    return (
      // TODO - Research mobile-specific accesibility compliment to onClick
      // eslint-disable-next-line
      <li className="top-rated__game" key={game.id} onClick={() => onViewGameDetailClick(game.id)}>
        <img className="top-rated__thumbnail" src={game.thumbnail} alt={game.name} />
        <span className="top-rated__name">{game.name}</span>
      </li>
    );
  });

  return (
    <div className="top-rated">
      <h2 className="top-rated__header">Top 10</h2>
      <ul className="top-rated__list">
        {gameElements}
      </ul>
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
