import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NProgress from "nprogress"

import PageIndexContainer from '../containers/page_index_container'
import PageDetailContainer from '../containers/page_detail_container'
import { sendGet } from "../utils/utils"

export default class Router extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/"                      component={PageIndexContainer} />
        <Route exact path="/month/:year/:month"    component={PageIndexContainer} />
        <Route exact path="/day/:year/:month/:day" component={PageDetailContainer} />
      </Switch>
    )
  }

}
