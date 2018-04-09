import polyfill from 'es6-promise';
import fetch from '../util/fetch';
import xmlToJson from '../util/xmlToJson';

polyfill.polyfill();

// TODO: Extract to use for other fetch requests
const transform = (data, sortProperty, sortOrder = 'ASC') => {
  const gameElements = xmlToJson(data).elements[0].elements;

  let reducedElements = gameElements.reduce((acc, game) => {
    const reducedGame = {
      id: game.attributes.id,
      rank: Number(game.attributes.rank),
      thumbnail: game.elements[0].attributes.value,
      name: game.elements[1].attributes.value,
      year: Number(game.elements[2].attributes.value),
    };

    acc.push(reducedGame);

    return acc;
  }, []);

  if (sortProperty) {
    reducedElements = reducedElements.sort((a, b) => a[sortProperty] - b[sortProperty]);
    reducedElements = 'ASC' ? reducedElements : reducedElements.reverse();
  }

  return reducedElements;
};

const getTopRated = async () => {
  const topRated = await fetch('/hot?type=boardgame')
    .then((data) => {
      const transformedData = transform(data);
      const sortedData = transformedData.sort((a, b) => a.rank - b.rank);

      return sortedData;
    });
    // TODO .catch(() => { ...someErrorHandling });

  return topRated;
};

export default getTopRated;
