/* eslint-disable no-underscore-dangle */
import { forEach } from 'lodash';
import convert from 'xml-js';

const formatArray = (json) => {
  const formattedCollection = [];

  json.forEach((game) => {
    const formattedGame = {};

    forEach(game, (value, key) => {
      if (key === '_attributes') {
        formattedGame.id = value.id;
        formattedGame.rank = Number(value.rank);
      } else if (key === 'yearpublished') {
        formattedGame.year = Number(value._attributes.value);
      } else {
        formattedGame[key] = value._attributes.value;
      }
    });

    formattedCollection.push(formattedGame);
  });

  return formattedCollection;
};

const formatObject = (json) => {
  const formattedGame = {
    categories: [],
    mechanics: [],
    designers: [],
    artists: [],
    publishers: [],
  };

  forEach(json, (value, key) => {
    if (key === '_attributes') {
      formattedGame.id = value.id;
    } else if (value._text) {
      formattedGame[key] = value._text;
    } else if (value._attributes) {
      formattedGame[key] = Number(value._attributes.value) || value._attributes.value;
    } else if (value.length) {
      value.forEach((poll) => {
        if (poll._attributes.type === 'boardgamecategory') {
          formattedGame.categories.push(poll._attributes.value);
        }

        if (poll._attributes.type === 'boardgamemechanic') {
          formattedGame.mechanics.push(poll._attributes.value);
        }

        if (poll._attributes.type === 'boardgamedesigner') {
          formattedGame.designers.push(poll._attributes.value);
        }

        if (poll._attributes.type === 'boardgameartist') {
          formattedGame.artists.push(poll._attributes.value);
        }

        if (poll._attributes.type === 'boardgamepublisher') {
          formattedGame.publishers.push(poll._attributes.value);
        }
      });
    }
  });

  return formattedGame;
};

const xmlToJs = (xml) => {
  const json = convert.xml2js(xml, { compact: true }).items.item;

  if (json.length) {
    return formatArray(json);
  }

  return formatObject(json);
};

export default xmlToJs;
