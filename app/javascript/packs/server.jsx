import React from 'react'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'

import { StaticRouter } from 'react-router-dom'
import Router from './router'
import rootReducer from '../reducers/index'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import date from '../reducers/date'
import records from '../reducers/records'
import record from '../reducers/record'

const App = (props, railsContext) => {
  const { location } = railsContext
  const context = {}

  const store = createStore(
    combineReducers({
      date: date,
      records: records,
      record: record,
      router: routerReducer
    }),
    props,
    applyMiddleware(thunk, logger)
  );

  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <Router />
      </StaticRouter>
    </Provider>
  )
}

ReactOnRails.register({
  App,
});
