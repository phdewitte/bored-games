/* TODO - Research mobile-specific accesibility compliment to onClick */
/* eslint-disable  */

import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../../components';
import './TopRated.css';

const TopRated = ({ isLoading, topRated, onViewGameDetailClick }) => {
  const gameElements = topRated.map((game) => {
    return (
      <div className="top-rated__card" key={game.id}>
        <img
          onClick={() => onViewGameDetailClick(game.id)}
          className="top-rated__thumbnail"
          src={game.thumbnail}
          alt={game.name}
        />
        <h3 className="top-rated__name">{game.name}</h3>
        <h3 className="top-rated__year">{game.year}</h3>
        <button className="top-rated__add-button">Add to list</button>
      </div>
    );
  });

  return (
    <div className="top-rated">
      <h2 className="top-rated__header">BoardGameGeek Hotness&hellip;</h2>
      {isLoading ? <Loading /> : <div className="top-rated__list">{gameElements}</div>}
    </div>
  );
};

TopRated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
