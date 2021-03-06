import { createStore, compose, applyMiddleware } from 'redux';
import { install as installReduxLoop } from 'redux-loop';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const middlewares = [historyMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  const { logger } = require('redux-logger');
  // Logger must be last in middleware chain
  middlewares.push(logger);
}

const enhancer = compose(
  installReduxLoop(),
  applyMiddleware(...middlewares),
);

const store = createStore(rootReducer, {}, enhancer);

export { history };

export default store;
