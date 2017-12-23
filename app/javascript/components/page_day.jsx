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
          if (this.state.record !== null) {
            return <div>{this.state.record.result}</div>;
          }
        })()}

        <button onClick={this.selectResult} className={this.state.record !== null && this.state.record.result === 'good'? 'isSelected' : ''}    data-result="good">○</button>
        <button onClick={this.selectResult} className={this.state.record !== null && this.state.record.result === 'limited'? 'isSelected' : ''} data-result="limited">△</button>
        <button onClick={this.selectResult} className={this.state.record !== null && this.state.record.result === 'bad'? 'isSelected' : ''}     data-result="bad">×</button>
        <hr />
        <Link href={`/month/${this.state.date.year}/${this.state.date.month}`}>もどる</Link>
      </div>
    );
  }
}
