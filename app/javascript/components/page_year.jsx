import PropTypes from 'prop-types'
import React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'

export default class PageYear extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      records: this.props.records,
    }
  }

  render() {
    return (
      <div>
      year
      </div>
    )
  }
}
