import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from "nprogress";

import PageIndex from './page_index';
import PageDetail from './page_detail';
import { sendGet } from "./utils";

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
        <Route exact path="/"                      render={(props) => <PageIndex  {...props} {...this.state.rootProps} />} />
        <Route exact path="/month/:year/:month"    render={(props) => <PageIndex  {...props} {...this.state.rootProps} />} />
        <Route exact path="/day/:year/:month/:day" render={(props) => <PageDetail {...props} {...this.state.rootProps} />} />
      </Switch>
    )
  }

}
