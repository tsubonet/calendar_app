import PropTypes from 'prop-types'
import React from 'react'

import Link from '../components/link'

import PageYearContainer from '../containers/page_year_container'
import PageMonthContainer from '../containers/page_month_container'
import PageDayContainer from '../containers/page_day_container'

import style from '../css/router.scss'

export default class Router extends React.Component {
  static get childContextTypes() {
    return {
      onLinkClick: PropTypes.func,
    }
  }

  constructor(props) {
    super(props)
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
    }
  }

  componentDidMount() {
    const { transitTo } = this.props
    window.addEventListener('popstate', () => {
      transitTo(document.location.href, { pushState: false })
    })
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault()
      const { transitTo } = this.props
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a')
      transitTo(anchorElement.href, { pushState: true })
    }
  }

  getComponent() {
    const { actionPath } = this.props
    switch (actionPath) {
      case 'calendar#month':
        return PageMonthContainer
      case 'calendar#day':
        return PageDayContainer
      case 'calendar#year':
        return PageYearContainer
    }
  }

  render() {
    const Component = this.getComponent()
    return (
      <div>
        <div className={style.logo}>
          <Link href="/">たいせいくんのラジオ体操</Link>
        </div>
        <Component {...this.props} />
      </div>
    )
  }
}
