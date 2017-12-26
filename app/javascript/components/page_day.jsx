import React from 'react'
import Link from '../components/link'
import { sendPost, sendPatch } from "../utils"
import style from '../css/page_day.scss'

export default class PageDay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props};
    this.selectResult = this.selectResult.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
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

  deleteResult(e) {
    e.preventDefault();
    this.props.deleteRecord(this.state.record);
  }
  render() {
    const { date, record } = this.state;
    return (
      <div>
        <p className={style.caption}>{date.year}年{date.month}月{date.day}日</p>
        <dl className={style.result_box}>
          <dt><i className='fas fa-hand-point-down'></i> この日の結果は...</dt>
          <dd>
          {(() => {
            if (record !== null) {
              return (
                <div className={'result-image '+ record.result}>
                  <div className={style.delete_btn}><a onClick={this.deleteResult}><i className='fas fa-trash-alt fa-2x'></i></a></div>
                </div>
              )
            } else {
              return <div>まだ記入がありません</div>;
            }
          })()}
          </dd>
        </dl>
        <dl className={style.select_box}>
          <dt><i className='fas fa-hand-point-down'></i> 結果を選択する</dt>
          <dd>
            <ul className={style.buttons}>
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'good'?    'isSelected' : ''} data-result='good'><span className={style.good}></span></a></li>
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'limited'? 'isSelected' : ''} data-result='limited'><span className={style.limited}></span></a></li>
              <li><a onClick={this.selectResult} className={record !== null && record.result === 'bad'?     'isSelected' : ''} data-result='bad'><span className={style.bad}></span></a></li>
            </ul>
          </dd>
        </dl>
        <Link href={`/month/${date.year}/${date.month}`}><i className='fas fa-angle-left'></i> カレンダーにもどる</Link>
      </div>
    );
  }
}
