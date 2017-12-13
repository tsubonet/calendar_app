import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from "nprogress";

import PageIndex from './page_index';
import PageDetail from './page_detail';
import Index from './index';
import Show from './show';
import { sendGet } from "./utils";

export default class Router extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rootProps: this.props,
    };
  }

  static childContextTypes = {
    clickToGetRootProps: PropTypes.func,
  }

  getChildContext() {
    return {
      clickToGetRootProps: this.clickToGetRootProps.bind(this),
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.transitTo(document.location.href, { pushState: false });
    });
  }

  clickToGetRootProps(e) {
    this.transitTo(e.currentTarget.href, { pushState: true });
  }

  transitTo(url, { pushState }, data = {}) {
    NProgress.start();
    sendGet(url)
    .then((rootProps) => {
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
        <Route exact path="/"                      render={(props) => <PageIndex  {...this.state.rootProps} {...props} />} />
        <Route exact path="/month/:year/:month"    render={(props) => <PageIndex  {...this.state.rootProps} {...props} />} />
        <Route exact path="/day/:year/:month/:day" render={(props) => <PageDetail {...this.state.rootProps} {...props} />} />

        <Route exact path="/hello_world"      render={() => <Index {...this.state.rootProps} />} />
        <Route exact path="/hello_world/show" render={() => <Show {...this.state.rootProps} />} />
      </Switch>
    )
  }

}
