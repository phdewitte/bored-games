import { combineReducers } from 'redux-loop';
import { homeReducer as homePageReducer } from './home/ducks';

export default combineReducers({
  homePage: homePageReducer,
});
