import React from 'react';
// import ErrorBoundary from 'components';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import AsyncComponent from './components/AsyncComponent';

const Home = AsyncComponent(() => import('./home/Home' /* webpackChunkName: 'Home' */));
const GameDetail = AsyncComponent(() => import('./gameDetail/GameDetail' /* webpackChunkName: 'GameDetail' */));
const Error = AsyncComponent(() => import('./error/Error' /* webpackChunkName: 'Error' */));

const Router = () => (
  // <ErrorBoundary>
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/games/:gameId" component={GameDetail} />
      <Route exact path="/error" component={Error} />
    </Switch>
  </ConnectedRouter>
  // </ErrorBoundary>
);

export default Router;
