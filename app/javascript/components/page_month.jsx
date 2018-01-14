import React from 'react'
import Link from '../components/link'
import Calendar from '../components/calendar'
import Charts from '../components/charts'
import style from '../css/page_month.scss'

export default class PageMonth extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  prevCalendar() {
    if (this.state.date.month === 1) {
      return `/month/${this.state.date.year - 1}/12`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month - 1}`
    }
  }

  nextCalendar() {
    if (this.state.date.month === 12) {
      return `/month/${this.state.date.year + 1}/1`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month + 1}`
    }
  }

  render() {
    return (
      <div>
        <nav className={style.controll_nav}>
          <ul>
            <li>
              <Link href={this.prevCalendar()}>
                <i className="fas fa-angle-left fa-2x" />
              </Link>
            </li>
            <li>
              <Link href={this.nextCalendar()}>
                <i className="fas fa-angle-right fa-2x" />
              </Link>
            </li>
            <li>
              <Link href="/" className={style.controll_button}>
                今月
              </Link>
            </li>
            <li>
              <Link href={`/year/${this.state.date.year}`} className={style.controll_button}>
                {this.state.date.year}年一覧
              </Link>
            </li>
          </ul>
        </nav>
        <Calendar {...this.state} />
        <Charts {...this.state} />
      </div>
    )
  }
}
