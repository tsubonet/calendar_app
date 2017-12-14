import PropTypes from 'prop-types';
import React from 'react';
import Link from './link';
import { sendPost, sendPatch } from "./utils";

export default class PageDetail extends React.Component {

  constructor(props) {
    super(props);
    let { year, month, day } = this.props.match.params;
    this.state = Object.assign({}, {
      record: this.props.record || {}
    }, this.validDate(parseInt(year), parseInt(month), parseInt(day)));
    this.selectResult = this.selectResult.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      record: nextProps.record,
    });
  }

  validDate(yy, mm, dd) {
    const dt = new Date(yy, mm - 1, dd);
    if (dt.getFullYear() === yy && dt.getMonth() === mm-1 && dt.getDate() === dd){
      return {
        year: yy,
        month: mm,
        day: dd,
      }
    } else {
      return {
        year: this.props.year,
        month: this.props.month,
        day: this.props.day,
      }
    }
  }

  selectResult(e) {
    const result = e.target.getAttribute("data-result");

    if (this.state.record) {
      sendPatch('/records/'+ this.state.record.id, {
        result: result,
      })
      .then((data) => {
        if (data.status === 'success') {
          this.setState({
            record: data.record
          });
        }
      })
    } else {
      sendPost('/records', {
        result: result,
        done_on: `${this.state.year}-${this.state.month}-${this.state.day}`,
      })
      .then((data) => {
        if (data.status === 'success') {
          this.setState({
            record: data.record
          });
        }
      })
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.year}年{this.state.month}月{this.state.day}日</p>
        {(() => {
          if (this.state.record !== undefined && this.state.record !== null) {
            return <div>{this.state.record.result}</div>;
          }
        })()}

        <button onClick={this.selectResult} className={this.state.record !== undefined && this.state.record !== null && this.state.record.result === 'good'? 'isSelected' : ''}    data-result="good">○</button>
        <button onClick={this.selectResult} className={this.state.record !== undefined && this.state.record !== null && this.state.record.result === 'limited'? 'isSelected' : ''} data-result="limited">△</button>
        <button onClick={this.selectResult} className={this.state.record !== undefined && this.state.record !== null && this.state.record.result === 'bad'? 'isSelected' : ''}     data-result="bad">×</button>
        <hr />
        <Link history={this.props.history} href={`/month/${this.state.year}/${this.state.month}`}>もどる</Link>
      </div>
    );
  }
}
