import React from 'react'
import Link from '../components/link'
import { sendPost, sendPatch } from '../utils'
import style from '../css/page_day.scss'

export default class PageDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.selectResult = this.selectResult.bind(this)
    this.deleteResult = this.deleteResult.bind(this)
  }

  selectResult(e) {
    e.preventDefault()
    const { date, record, patchRecord, postRecord } = this.props
    const result = e.currentTarget.getAttribute('data-result')
    if (record !== null) {
      patchRecord(record, result)
    } else {
      postRecord(date, result)
    }
  }

  deleteResult(e) {
    e.preventDefault()
    const { deleteRecord, record } = this.props
    deleteRecord(record)
  }

  getDay() {
    const { date } = this.props
    const dayNames = ['日', '月', '火', '水', '木', '金', '土']
    const targetDay = new Date(date.year, date.month - 1, date.day)
    const day = targetDay.getDay()
    return dayNames[day]
  }

  render() {
    const { date, record } = this.props
    const { isEdit } = this.state
    return (
      <div>
        <p className={style.caption}>
          {date.year}年{date.month}月{date.day}日({this.getDay()})
        </p>
        <dl className={style.result_box}>
          <dt>
            <i className="fas fa-hand-point-down" /> この日の結果は...
          </dt>
          <dd>
            {(() => {
              if (record !== null) {
                return (
                  <div className={'result-image ' + record.result}>
                    <div className={style.delete_btn}>
                      <a onClick={this.deleteResult} className="delete-trigger">
                        <i className="fas fa-trash-alt fa-2x" />
                      </a>
                    </div>
                  </div>
                )
              } else {
                return <div className="record-empty">まだ記入がありません</div>
              }
            })()}
          </dd>
        </dl>
        {(() => {
          if (record === null || isEdit === true) {
            return (
              <dl className={style.select_box}>
                <dt>
                  <i className="fas fa-hand-point-down" /> 結果を選択する
                </dt>
                <dd>
                  <ul className={style.buttons}>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'good' ? 'isSelected' : ''}
                        data-result="good"
                      >
                        <span className={style.good} />
                        <span className={style.result_text}>完璧！</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'limited' ? 'isSelected' : ''}
                        data-result="limited"
                      >
                        <span className={style.limited} />
                        <span className={style.result_text}>半分くらいできた</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'wakeup' ? 'isSelected' : ''}
                        data-result="wakeup"
                      >
                        <span className={style.wakeup} />
                        <span className={style.result_text}>起きただけ</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'bad' ? 'isSelected' : ''}
                        data-result="bad"
                      >
                        <span className={style.bad} />
                        <span className={style.result_text}>起きれなかった</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={this.selectResult}
                        className={record !== null && record.result === 'bad' ? 'isSelected' : ''}
                        data-result="sick"
                      >
                        <span className={style.sick} />
                        <span className={style.result_text}>体調不良</span>
                      </a>
                    </li>
                  </ul>
                </dd>
              </dl>
            )
          } else {
            return (
              <div style={{ marginBottom: '10px' }}>
                <a
                  href="javascript:;"
                  onClick={() => {
                    this.setState({ isEdit: true })
                  }}
                  className="edit-trigger"
                >
                  <i className="fas fa-angle-left" /> 結果を修正する
                </a>
              </div>
            )
          }
        })()}
        <Link href={`/month/${date.year}/${date.month}`}>
          <i className="fas fa-angle-left" /> カレンダーにもどる
        </Link>
      </div>
    )
  }
}
