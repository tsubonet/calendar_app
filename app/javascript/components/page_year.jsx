import React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/calendar'

export default class PageYear extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    const { recordsYear, date } = this.props
    return (
      <div>
        {(() => {
          return recordsYear.map((records, i) => {
            let _date = Object.assign({}, date)
            _date.month = i + 1
            return <Calendar key={i} date={_date} records={records} />
          })
        })()}
        <Link href={`/`}>
          <i className="fas fa-angle-left" /> 今月にもどる
        </Link>
      </div>
    )
  }
}
