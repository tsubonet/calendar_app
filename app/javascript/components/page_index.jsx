import PropTypes from 'prop-types';
import React from 'react';
import { getHoliday } from '../utils/utils';
import Link from '../components/link'

export default class PageIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      records: this.props.records,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
      records: nextProps.records,
    });
  }

  prevCalendar() {
    if (this.state.date.month === 1) {
      return `/month/${this.state.date.year-1}/12`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month-1}`
    }
  }

  nextCalendar() {
    if (this.state.date.month === 12) {
      return `/month/${this.state.date.year+1}/1`
    } else {
      return `/month/${this.state.date.year}/${this.state.date.month+1}`
    }
  }

  getToday() {
    return {
      year: new Date().getFullYear(),   // 今日の「年」(4桁までの年)
      month: new Date().getMonth() + 1, // 今日の「月」(0-11)+1
      date: new Date().getDate(),	      // 今日の「日」(1-31)
    }
  }

  isHoliday(dd) {
    const holidayList = getHoliday(this.state.date.year).filter((holiday, i) => {
      return parseInt(holiday.month) === this.state.date.month; // 当月のみ格納
    }).map((holiday, i) => {
      return holiday.day;
    });
    return holidayList.indexOf(String(dd)) > -1;
  }

  addDayClass(i, dd = null) {
    let date = [];
    if (i === 5) {
      date.push('sat');
    } else if (i === 6) {
      date.push('sun');
    }
    if (this.isHoliday(dd)) {
      date.push('holiday');
    }
    if (this.getToday().year === this.state.date.year
     && this.getToday().month === this.state.date.month
     && this.getToday().date === dd) {
      date.push('today');
    }
    return (date.length === 0)? null: date.join(' ');
  }

  render() {
    const days = ['月','火','水','木','金','土','日'];
    const daysLength = days.length;
    const endOfPrevMonth    = new Date(this.state.date.year, this.state.date.month - 1, 0); // 前月末
    const endOfCurrentMonth = new Date(this.state.date.year, this.state.date.month, 0);     // 当月末
    const endOfPrevMonthDay     = endOfPrevMonth.getDay();  　 // 前月末曜日 (0-6)
    const endOfCurrentMonthDate = endOfCurrentMonth.getDate(); // 当月末日付 (1-31)
    const rows = Math.ceil((endOfPrevMonthDay + endOfCurrentMonthDate) / daysLength);	// カレンダーの行数

    let cells = new Array(daysLength * rows);	// 表のセル数を用意
    for (let i = 0; i < endOfCurrentMonthDate; i++) {
      cells[endOfPrevMonthDay + i] = i + 1;	// 日付を埋め込む
    }

    return (
      <div>
        <div>{this.state.date.year}年{this.state.date.month}月</div>
        <div>
          <Link href={this.prevCalendar()} className='prev-button'>←</Link>
          <Link href='/'                   className='today-button'>今月</Link>
          <Link href={this.nextCalendar()} className='next-button'>→</Link>
        </div>
        <table>
          <thead>
            <tr>
            {(() => {
              return days.map((day, i) => {
                return (
                  <td className={this.addDayClass(i)} key={i}>{day}</td>
                )
              });
            })()}
            </tr>
          </thead>
          <tbody>
          {(() => {
            return [...Array(rows).keys()].map((row, i) => {
              return (
                <tr key={i}>
                {(() => {
                  return days.map((day, j) => {
                    const dd = cells[j + ( i * daysLength )];
                    const record = this.state.records.find((record) => {
                      const pattern = new RegExp("\\d{4}-\\d{2}-" + String(dd).padStart(2, "0"));
                      return pattern.test(record.done_on)
                    });
                    return (
                      <td className={this.addDayClass(j, dd)} key={j}>
                        <Link href={`/day/${this.state.date.year}/${this.state.date.month}/${dd}`}>
                          <div>{dd}</div>
                          {(() => {
                            if (typeof record !== 'undefined') {
                              return <div>{record.result}</div>;
                            }
                          })()}
                        </Link>
                      </td>
                    )
                  });
                })()}
                </tr>
              )
            });
          })()}
          </tbody>
        </table>
      </div>
    );
  }
}
