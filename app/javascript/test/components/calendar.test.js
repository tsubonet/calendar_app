import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Calendar from '../../components/calendar'
Enzyme.configure({ adapter: new Adapter() })

describe('<Calendar>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      actionPath: 'calendar#month',
      date: { year: 2018, month: 1, day: 1 },
      records: [],
    }
  })

  test('<Calendar>', () => {
    const calendar = mount(<Calendar {...props} />)
    // サンプルデータを20180101とする
    // 20180101はカレンダーの一番左上にくる
    const day20180101 = calendar
      .find('tbody > tr')
      .first()
      .find('td')
      .first()
    // 年月が正しく表示されるか
    expect(calendar.find('[data-role="caption"]').text()).toBe('2018年1月')
    // 日付が正しく表示されるか
    expect(day20180101.text()).toBe('1')
    // リンク先が正しいか
    expect(day20180101.find('a').props().href).toBe('/day/2018/1/1')
    // 祝日の表示テストをしたかったが、cssmodulesで定義したcssが取得できない。。
    // expect(day20180101.props().clasName).toMatch(/(holiday)/)
  })
})
