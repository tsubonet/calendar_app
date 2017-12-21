import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'

import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import rootReducer from '../reducers/index'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

import date from '../reducers/date'
import records from '../reducers/records'
import record from '../reducers/record'


const App = (props, railsContext) => {

  const store = createStore(
    combineReducers({
      date: date,
      records: records,
      record: record,
      router: routerReducer
    }),
    props,
    applyMiddleware(middleware, thunk, logger)
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  )
};
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});
