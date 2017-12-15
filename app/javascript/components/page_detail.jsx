import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { sendPost, sendPatch } from "../utils/utils";

export default class PageDetail extends React.Component {

  constructor(props) {
    super(props);
    let { year, month, day } = this.props.match.params;
    this.state = Object.assign({}, { record: this.props.record }, this.validDate(parseInt(year), parseInt(month), parseInt(day)));
    this.selectResult = this.selectResult.bind(this);
  }

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.props.onFetchData2(document.location.href)
    });
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
        date: {
          year: yy,
          month: mm,
          day: dd,
        }
      }
    } else {
      return this.props.date
    }
  }

  selectResult(e) {
    const result = e.target.getAttribute("data-result");

    if (Object.keys(this.state.record).length) {
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
        done_on: `${this.state.date.year}-${this.state.date.month}-${this.state.date.day}`,
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
        <p>{this.state.date.year}年{this.state.date.month}月{this.state.date.day}日</p>
        {(() => {
          if (Object.keys(this.state.record).length) {
            return <div>{this.state.record.result}</div>;
          }
        })()}

        <button onClick={this.selectResult} className={Object.keys(this.state.record).length && this.state.record.result === 'good'? 'isSelected' : ''}    data-result="good">○</button>
        <button onClick={this.selectResult} className={Object.keys(this.state.record).length && this.state.record.result === 'limited'? 'isSelected' : ''} data-result="limited">△</button>
        <button onClick={this.selectResult} className={Object.keys(this.state.record).length && this.state.record.result === 'bad'? 'isSelected' : ''}     data-result="bad">×</button>
        <hr />
        <Link to={`/month/${this.state.date.year}/${this.state.date.month}`} onClick={this.props.onFetchData}>もどる</Link>
      </div>
    );
  }
}
