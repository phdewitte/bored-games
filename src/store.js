import { createStore, compose, applyMiddleware } from 'redux';
import { install as installReduxLoop } from 'redux-loop';
import rootReducer from './rootReducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
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

export default store;
