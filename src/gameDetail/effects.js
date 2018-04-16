import { decode } from 'he';
import fetch from '../util/fetch';
import xmlToJs from '../util/xmlToJs';

const transform = (data) => {
  const parsed = xmlToJs(data);

  const transformed = {
    id: parsed.id,
    name: parsed.name,
    description: decode(parsed.description),
    year: parsed.yearpublished,
    image: parsed.image,
    thumbnail: parsed.thumbnail,
    minAge: parsed.minAge,
    maxPlayers: parsed.maxplayers,
    minPlayers: parsed.minplayers,
    categories: parsed.categories,
    mechanics: parsed.mechanics,
    designers: parsed.designers,
    artists: parsed.artists,
    publishers: parsed.publishers,
  };

  return transformed;
};

const getGame = (gameId) => {
  return fetch(`/thing?type=boardgame&id=${gameId}`)
    .then(data => transform(data));
};

export default getGame;
