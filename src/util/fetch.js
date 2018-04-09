import isomorphicFetch from 'isomorphic-fetch';

const apiBase = 'https://www.boardgamegeek.com/xmlapi2';

const fetch = (path) => {
  // TODO: Add options, headers, etc...

  return isomorphicFetch(`${apiBase}${path}`)
    .then(response => response.text())
    .then(data => data);
};

export default fetch;
