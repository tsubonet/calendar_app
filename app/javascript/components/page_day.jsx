import React from 'react'
import Link from '../components/link'
import { sendPost, sendPatch } from "../utils"

export default class PageDay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props};
    this.selectResult = this.selectResult.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  selectResult(e) {
    e.preventDefault();
    const result = e.currentTarget.getAttribute("data-result");
    if (this.state.record !== null) {
      this.props.patchRecord(this.state.record, result);
    } else {
      this.props.postRecord(this.state.date, result);
    }
  }

  render() {
    const { date, record } = this.state;
    return (
      <div>
        <p className="day-caption">{date.year}年{date.month}月{date.day}日</p>
        <dl className="day-result">
          <dt>この日の結果は...</dt>
          <dd>
          {(() => {
            if (record !== null) {
              return <div className={record.result}></div>;
            } else {
              return <div>まだ記入がありません</div>;
            }
          })()}
          </dd>
        </dl>
        <dl className="day-select">
          <dt>結果を選択する</dt>
          <dd>
            <ul className="day-buttons">
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'good'?    'isSelected' : ''} data-result="good"><span className="good"></span></a></li>
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'limited'? 'isSelected' : ''} data-result="limited"><span className="limited"></span></a></li>
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'bad'?     'isSelected' : ''} data-result="bad"><span className="bad"></span></a></li>
            </ul>
          </dd>
        </dl>
        <Link href={`/month/${date.year}/${date.month}`}><i className="fas fa-angle-left"></i> カレンダーにもどる</Link>
      </div>
    );
  }
}
