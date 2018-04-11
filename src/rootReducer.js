import { combineReducers } from 'redux-loop';
import { homeReducer as homePageReducer } from './home/ducks';
import { searchReducer } from './home/search/ducks';

export default combineReducers({
  homePage: homePageReducer,
  search: searchReducer,
});
