import PropTypes from 'prop-types'
import React from 'react'

export default class Link extends React.Component {
  static get contextTypes() {
    return {
      onLinkClick: PropTypes.func,
    }
  }

  onClick(event) {
    this.context.onLinkClick(event)
  }

  render() {
    return (
      <a onClick={this.onClick.bind(this)} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}
