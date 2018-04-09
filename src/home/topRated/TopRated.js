import React from 'react';
import PropTypes from 'prop-types';
import './TopRated.css';

const TopRated = ({ topRated }) => {
  // TODO: Update limit to a config setting instead of hardcoding
  const topRatedSelection = topRated.slice(0, 25);

  const gameElements = topRatedSelection.map((game) => {
    return (
      <li className="top-rated__game" key={game.id}>
        <img className="top-rated__thumbnail" src={game.thumbnail} alt={game.name} />
        <span className="top-rated__name">{game.name}</span>
      </li>
    );
  });

  return (
    <ul className="top-rated">
      {gameElements}
    </ul>
  );
};

TopRated.propTypes = {
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      rank: PropTypes.string,
      thumbnail: PropTypes.string,
      year: PropTypes.string,
    }),
  ).isRequired,
};

export default TopRated;
