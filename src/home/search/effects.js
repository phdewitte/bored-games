import polyfill from 'es6-promise';
import fetch from '../../util/fetch';
import xmlToJson from '../../util/xmlToJson';

polyfill.polyfill();

const transform = (data) => {
  const collection = xmlToJson(data).elements[0].elements;

  return collection.map(result => ({
    id: result.attributes.id,
    name: result.elements[0].attributes.value,
    year: result.elements[1]
      ? Number(result.elements[1].attributes.value)
      : null,
  }));
};

const postSearch = (searchInput) => {
  return fetch(`/search?type=boardgame&query=${searchInput}`)
    .then(data => transform(data));
};

export default postSearch;
