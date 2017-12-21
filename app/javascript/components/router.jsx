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

  componentWillReceiveProps(nextProps) {
    this.setState({
      rootProps: nextProps,
    });
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.props.transitTo(document.location.href, { pushState: false });
    });
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector("a");
      this.props.transitTo(anchorElement.href, { pushState: true });
    }
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
