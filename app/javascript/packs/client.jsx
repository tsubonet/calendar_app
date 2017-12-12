import React from 'react';
import ReactOnRails from 'react-on-rails';
import { BrowserRouter } from 'react-router-dom';
import Router from '../components/router';

const App = (props, railsContext) => {
  return (
    <BrowserRouter>
      <Router {...props} />
    </BrowserRouter>
  );
};
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});
