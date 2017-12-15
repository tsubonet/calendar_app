import React from 'react';
import ReactOnRails from 'react-on-rails';
import { StaticRouter } from 'react-router-dom';
import Router from '../components/router';

const App = (props, railsContext) => {
  const { location } = railsContext
  const context = {}

  return (
    <StaticRouter location={location} context={context}>
      <Router {...props} />
    </StaticRouter>
  )
}

ReactOnRails.register({
  App,
});
