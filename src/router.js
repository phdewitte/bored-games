import React from 'react';
// import ErrorBoundary from 'components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AsyncComponent from './components/AsyncComponent';

const Home = AsyncComponent(() => import('./home/Home'));

const Router = () => (
  // <ErrorBoundary>
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
  // </ErrorBoundary>
);

export default Router;
