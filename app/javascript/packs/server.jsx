import React from 'react'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'

import { StaticRouter } from 'react-router-dom'
import RouterContainer from '../containers/router_container'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import actionPath from '../reducers/action_path'
import date from '../reducers/date'
import records from '../reducers/records'
import record from '../reducers/record'

const App = (props, railsContext) => {

  const { location } = railsContext
  const context = {}

  const store = createStore(
    combineReducers({
      actionPath: actionPath,
      date: date,
      records: records,
      record: record,
      router: routerReducer
    }),
    props,
    applyMiddleware(logger)
  );

  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <RouterContainer />
      </StaticRouter>
    </Provider>
  )
};

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});
