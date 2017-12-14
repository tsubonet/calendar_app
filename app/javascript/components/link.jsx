import PropTypes from 'prop-types';
import React from 'react';

export default class Link extends React.Component {

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  onClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      this.context.transitTo(event.currentTarget.getAttribute('href'), { pushState: true }, this.props.history);
    }
  }

  render() {
    const { href, className } = this.props;
    return(
      <a onClick={this.onClick.bind(this)} href={href} className={className}>
        {this.props.children}
      </a>
    );
  }
}
