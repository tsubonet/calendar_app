import React from 'react'
import { Provider } from 'react-redux'
import ReactOnRails from 'react-on-rails'
import { StaticRouter } from 'react-router-dom'
import Router from './router'
import configureStore from '../store/index'

const App = (props, railsContext) => {
  const { location } = railsContext
  const context = {}
  const store = configureStore(props)

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
