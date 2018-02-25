import React from 'react'
import Link from '../components/link'
import Calendar from '../components/calendar'
import Charts from '../components/charts'
import style from '../css/page_month.scss'

export default class PageMonth extends React.Component {
  constructor(props) {
    super(props)
  }

  prevCalendar() {
    const { date } = this.props
    if (date.month === 1) {
      return `/month/${date.year - 1}/12`
    } else {
      return `/month/${date.year}/${date.month - 1}`
    }
  }

  nextCalendar() {
    const { date } = this.props
    if (date.month === 12) {
      return `/month/${date.year + 1}/1`
    } else {
      return `/month/${date.year}/${date.month + 1}`
    }
  }

  render() {
    const { date } = this.props
    return (
      <div>
        <nav className={style.controll_nav}>
          <ul>
            <li>
              <Link href={this.prevCalendar()} data-link="prev">
                <i className="fas fa-angle-left fa-2x" />
              </Link>
            </li>
            <li>
              <Link href={this.nextCalendar()} data-link="next">
                <i className="fas fa-angle-right fa-2x" />
              </Link>
            </li>
            <li>
              <Link href="/" className={style.controll_button}>
                今月
              </Link>
            </li>
            <li>
              <Link href={`/year/${date.year}`} className={style.controll_button}>
                {date.year}年一覧
              </Link>
            </li>
          </ul>
        </nav>
        <Calendar {...this.props} />
        <Charts {...this.props} />
      </div>
    )
  }
}
