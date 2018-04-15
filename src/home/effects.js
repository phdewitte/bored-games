import fetch from '../util/fetch';
import xmlToJs from '../util/xmlToJs';

// TODO: Extract to use for other fetch requests
const transform = (data, sortProperty, sortOrder = 'ASC') => {
  let gameElements = xmlToJs(data);

  const sortASC = 'ASC';

  if (sortProperty) {
    gameElements = gameElements.sort((a, b) => a[sortProperty] - b[sortProperty]);
    gameElements = sortASC ? gameElements : gameElements.reverse();
  }

  return gameElements;
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
