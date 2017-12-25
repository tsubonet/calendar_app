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
    const result = e.target.getAttribute("data-result");
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
        <p>{date.year}年{date.month}月{date.day}日</p>
        {(() => {
          if (record !== null) {
            return <div>{record.result}</div>;
          }
        })()}
        <button onClick={this.selectResult} className={record !== null && record.result === 'good'?    'isSelected' : ''} data-result="good">○</button>
        <button onClick={this.selectResult} className={record !== null && record.result === 'limited'? 'isSelected' : ''} data-result="limited">△</button>
        <button onClick={this.selectResult} className={record !== null && record.result === 'bad'?     'isSelected' : ''} data-result="bad">×</button>
        <hr />
        <Link href={`/month/${date.year}/${date.month}`}>もどる</Link>
      </div>
    );
  }
}
