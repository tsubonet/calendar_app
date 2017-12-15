import React from 'react'
import { Provider } from 'react-redux'
import ReactOnRails from 'react-on-rails'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import configureStore from '../store/index'

const App = (props, railsContext) => {
  const store = configureStore(props)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  )
};
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});
