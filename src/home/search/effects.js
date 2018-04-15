import fetch from '../../util/fetch';
import xmlToJs from '../../util/xmlToJs';

const transform = (data) => {
  const parsed = xmlToJs(data);
  const sorted = parsed.sort((a, b) => b.year - a.year);

  return sorted;
};

const postSearch = (searchInput) => {
  return fetch(`/search?type=boardgame&query=${searchInput}`)
    .then(data => transform(data));
};

export default postSearch;
