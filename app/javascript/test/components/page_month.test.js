import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import PageMonth from '../../components/page_month'
Enzyme.configure({ adapter: new Adapter() })

describe('<PageMonth>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      actionPath: 'calendar#month',
      date: { year: 2018, month: 1, day: 1 },
      records: [],
    }
  })

  test('should be correct link', () => {
    const pageMonth = mount(<PageMonth {...props} />)
    expect(pageMonth.find('Link[data-link="prev"]').props().href).toBe('/month/2017/12')
    expect(pageMonth.find('Link[data-link="next"]').props().href).toBe('/month/2018/2')
  })
})
