import convert from 'xml-js';

const xmlToJson = xml => convert.xml2js(xml);

export default xmlToJson;
