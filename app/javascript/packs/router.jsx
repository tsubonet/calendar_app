import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NProgress from "nprogress"

import PageIndexContainer from '../containers/page_index_container'
//import PageDetail from './page_detail'
import { sendGet } from "../utils/utils"

export default class Router extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rootProps: this.props,
    };
  }

  static childContextTypes = {
    transitTo: PropTypes.func,
  }

  getChildContext() {
    return {
      transitTo: this.transitTo.bind(this),
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.transitTo(document.location.href, { pushState: false });
    });
  }

  transitTo(url, { pushState }, history = null) {
    NProgress.start();
    sendGet(url)
    .then((rootProps) => {
      if (pushState) {
        history.push(url);
      }
      this.setState({ rootProps });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"                   component={PageIndexContainer} />
        <Route exact path="/month/:year/:month" component={PageIndexContainer} />
{
  //<Route exact path="/day/:year/:month/:day" render={(props) => <PageDetail {...props} {...this.state.rootProps} />} />
}

      </Switch>
    )
  }

}
