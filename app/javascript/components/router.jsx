import PropTypes from 'prop-types'
import React from 'react'
import NProgress from "nprogress"

import PageIndexContainer from '../components/page_index'
import PageDetailContainer from '../components/page_detail'
import { sendGet } from "../utils"

export default class Router extends React.Component {

  static childContextTypes = {
    onLinkClick: PropTypes.func,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
    };
 }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.transitTo(document.location.href, { pushState: false });
    });
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector("a");
      this.transitTo(anchorElement.href, { pushState: true });
    }
  }

  transitTo(url, { pushState }, data = {}) {
    NProgress.start();
    sendGet(url)
    .then((rootProps) => {
      if (pushState) {
        history.pushState(data, "", url);
      }
      this.setState({ rootProps });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  }

  getComponent() {
    switch (this.state.rootProps.actionPath) {
      case "calendar#month":
        return PageIndexContainer;
      case "calendar#day":
        return PageDetailContainer;
    }
  }

  render() {
    const Component = this.getComponent();
    return (
      <Component {...this.state.rootProps} />
    )
  }

}
