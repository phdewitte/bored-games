import { combineReducers } from 'redux-loop';
import { routerReducer } from 'react-router-redux';
import { homeReducer as homePageReducer } from './home/ducks';
import { searchReducer } from './home/search/ducks';
import { gameDetailReducer } from './gameDetail/ducks';

export default combineReducers({
  router: routerReducer,
  homePage: homePageReducer,
  search: searchReducer,
  gameDetail: gameDetailReducer,
});
