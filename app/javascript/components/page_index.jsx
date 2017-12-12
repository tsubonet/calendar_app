import PropTypes from 'prop-types';
import React from 'react';
import { getHoliday } from './utils';
import { Link } from 'react-router-dom';

export default class PageIndex extends React.Component {

  static contextTypes = {
    clickToGetRootProps: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      year: this.getToday().year,
      month: this.getToday().month,
    }
    this.prevCalendar = this.prevCalendar.bind(this);
    this.nextCalendar = this.nextCalendar.bind(this);
    this.currentCalendar = this.currentCalendar.bind(this);
  }

  // 当月へ移動
  currentCalendar(e) {
    e.preventDefault();
    this.setState({
      year: this.getToday().year,
      month: this.getToday().month,
    });
  }

  // 前月へ移動
  prevCalendar(e) {
    e.preventDefault();
    if (this.state.month === 0) {
      this.setState((prevState, props) => {
        return {
          year: prevState.year - 1,
          month: 11,
        }
      });
    } else {
      this.setState((prevState, props) => {
        return {
          month: prevState.month - 1,
        };
      });
    }
  }

  // 翌月へ移動
  nextCalendar(e) {
    e.preventDefault();
    if (this.state.month === 11) {
      this.setState((prevState, props) => {
        return {
          year: prevState.year + 1,
          month: 0,
        }
      });
    } else {
      this.setState((prevState, props) => {
        return {
          month: prevState.month + 1,
        };
      });
    }
  }

  getToday() {
    return {
      year: new Date().getFullYear(), // 今日の「年」(4桁までの年)
      month: new Date().getMonth(),   // 今日の「月」(0-11)
      date: new Date().getDate(),	    // 今日の「日」(1-31)
    }
  }

  isHoliday(dd) {
    const holidayList = getHoliday(this.state.year).filter((holiday, i) => {
      return parseInt(holiday.month) === this.state.month + 1; // 当月のみ格納
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
    if (this.getToday().year === this.state.year
     && this.getToday().month === this.state.month
     && this.getToday().date === dd) {
      date.push('today');
    }
    return (date.length === 0)? null: date.join(' ');
  }

  render() {
    const days = ['月','火','水','木','金','土','日'];
    const daysLength = days.length;
    const endOfPrevMonth    = new Date(this.state.year, this.state.month, 0);     // 前月末
    const endOfCurrentMonth = new Date(this.state.year, this.state.month + 1, 0); // 当月末
    const endOfPrevMonthDay     = endOfPrevMonth.getDay();  　 // 前月末曜日 (0-6)
    const endOfCurrentMonthDate = endOfCurrentMonth.getDate(); // 当月末日付 (1-31)
    const rows = Math.ceil((endOfPrevMonthDay + endOfCurrentMonthDate) / daysLength);	// カレンダーの行数

    let cells = new Array(daysLength * rows);	// 表のセル数を用意
    for (var i = 0; i < endOfCurrentMonthDate; i++) {
      cells[endOfPrevMonthDay + i] = i + 1;	// 日付を埋め込む
    }

    return (
      <div>
        <div>{this.state.year}年{this.state.month + 1}月</div>
        <div>
          <a href='#' onClick={this.prevCalendar} className='prev-button'>←</a>
          <a href='#' onClick={this.currentCalendar} className='today-button'>今月</a>
          <a href='#' onClick={this.nextCalendar} className='next-button'>→</a>
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
                    return (
                      <td className={this.addDayClass(j, dd)} key={j}>
                        <Link to="/">{dd}</Link>
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
        <Link to="/hello_world">aaa</Link>
      </div>
    );
  }
}
