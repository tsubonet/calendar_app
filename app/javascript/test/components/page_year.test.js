import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PageYear from '../../components/page_year'
Enzyme.configure({ adapter: new Adapter() })

describe('<PageYear>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      actionPath: 'calendar#year',
      date: { year: 2018, month: 1, day: 1 },
      records: [],
    }
  })

  test('<PageYear>', () => {
    const pageYear = mount(<PageYear {...props} />)
    expect(pageYear.find('[data-role="caption"]').length).toBe(12)
    expect(pageYear.find('[data-role="caption"]').everyWhere(n => n.text().match(/2018年\d*月/))).toBeTruthy()
  })
})
