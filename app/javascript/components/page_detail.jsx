import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class PageDetail extends React.Component {

  static contextTypes = {
    clickToGetRootProps: PropTypes.func,
  }

  constructor(props) {
    super(props);
    let { year, month, day } = this.props.match.params;
    this.state = Object.assign({result: ''}, this.validDate(parseInt(year), parseInt(month), parseInt(day)));
    this.selectResult = this.selectResult.bind(this);
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
    this.setState({
      result: e.target.getAttribute("data-result")
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.year}年{this.state.month}月{this.state.day}日</p>

        <div>{this.state.result}</div>

        <button onClick={this.selectResult} className={this.state.result === 'good'? 'isSelected' : ''} data-result="good">○</button>
        <button onClick={this.selectResult} className={this.state.result === 'limited'? 'isSelected' : ''} data-result="limited">△</button>
        <button onClick={this.selectResult} className={this.state.result === 'bad'? 'isSelected' : ''} data-result="bad">×</button>
        <hr />
        <Link to={`/month/${this.state.year}/${this.state.month}`} onClick={this.context.clickToGetRootProps}>もどる</Link>
      </div>
    );
  }
}
