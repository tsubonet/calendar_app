import React from 'react'
import { getHoliday } from '../utils'
import Link from '../components/link'
import Calendar from '../components/Calendar'

export default class PageYear extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    return (
      <div>
      {(() => {
        return [...Array(12).keys()].map((row, i) => {
          return (
            <Calendar {...this.state} />
          )
        });
      })()}
        <Link href={`/month/${this.state.date.year}/${this.state.date.month}`}>もどる</Link>
      </div>
    )
  }
}
