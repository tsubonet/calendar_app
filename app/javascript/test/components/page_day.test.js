import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import PageDay from '../../components/page_day'
Enzyme.configure({ adapter: new Adapter() })

describe('exist record test', () => {
  let props = {}
  beforeEach(() => {
    props = {
      actionPath: 'calendar#day',
      date: { year: 2018, month: 1, day: 24 },
      record: {
        id: 56,
        done_on: '2018-01-24',
        result: 'limited',
        created_at: '2018-01-08T05:33:57.000Z',
        updated_at: '2018-01-08T05:33:57.000Z',
      },
    }
  })

  test('click delete record', () => {
    const testMock = jest.fn()
    const pageDay = mount(<PageDay {...props} deleteRecord={testMock} />)
    pageDay.find('.delete-trigger').simulate('click')
    expect(testMock).toHaveBeenCalled()
  })

  test('click edit record', () => {
    const testMock = jest.fn()
    const pageDay = mount(<PageDay {...props} patchRecord={testMock} />)
    expect(toJson(pageDay)).toMatchSnapshot()

    pageDay.find('.edit-trigger').simulate('click')
    expect(pageDay.state('isEdit')).toBeTruthy()
    expect(toJson(pageDay)).toMatchSnapshot()

    pageDay.find('[data-result="good"]').simulate('click')
    expect(testMock).toHaveBeenCalled()
  })
})

describe('no exist record test', () => {
  let props = {}
  beforeEach(() => {
    props = {
      actionPath: 'calendar#day',
      date: { year: 2018, month: 1, day: 24 },
      record: null,
    }
  })

  test('click edit record', () => {
    const testMock = jest.fn()
    const pageDay = mount(<PageDay {...props} postRecord={testMock} />)
    pageDay.find('[data-result="good"]').simulate('click')
    expect(testMock).toHaveBeenCalled()
  })
})
