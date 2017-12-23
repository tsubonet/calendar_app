import PropTypes from 'prop-types'
import React from 'react'
import Link from '../components/link'
import Month from '../components/month'

export default class PageMonth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
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
        <div>
          <Link href={`/year/${this.state.date.year}/`}>{this.state.date.year}年</Link>
        </div>
        <div>
          <Link href={this.prevCalendar()} className='prev-button'>←</Link>
          <Link href='/'                   className='today-button'>今月</Link>
          <Link href={this.nextCalendar()} className='next-button'>→</Link>
        </div>
        <Month {...this.state} />
      </div>
    );
  }
}
