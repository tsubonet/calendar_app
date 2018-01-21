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
        result: 'good',
        created_at: '2018-01-08T05:33:57.000Z',
        updated_at: '2018-01-08T05:33:57.000Z',
      },
    }
  })

  test('click delete record', () => {
    const deleteFn = jest.fn()
    deleteFn.mockImplementation(() => {
      return {
        record: null,
      }
    })
    const pageDayBefore = mount(<PageDay {...props} deleteRecord={deleteFn} />)
    expect(pageDayBefore.find('.result-image.good').length).toBe(1)
    pageDayBefore.find('.delete-trigger').simulate('click')
    expect(deleteFn).toHaveBeenCalled()

    const pageDayAfter = mount(<PageDay {...Object.assign({}, props, deleteFn())} />)
    expect(pageDayAfter.find('.record-empty').text()).toBe('まだ記入がありません')
  })

  test('click edit record', () => {
    const patchFn = jest.fn()
    const pageDay = mount(<PageDay {...props} patchRecord={patchFn} />)
    expect(toJson(pageDay)).toMatchSnapshot()

    pageDay.find('.edit-trigger').simulate('click')
    expect(pageDay.state('isEdit')).toBeTruthy()
    expect(toJson(pageDay)).toMatchSnapshot()

    pageDay.find('[data-result="bad"]').simulate('click')
    expect(patchFn).toHaveBeenCalled()
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
  test('click post record', () => {
    const postFn = jest.fn()
    postFn.mockImplementation(() => {
      return {
        record: {
          id: 56,
          done_on: '2018-01-24',
          result: 'good',
          created_at: '2018-01-08T05:33:57.000Z',
          updated_at: '2018-01-08T05:33:57.000Z',
        },
      }
    })
    const pageDayBefore = mount(<PageDay {...props} postRecord={postFn} />)
    expect(pageDayBefore.find('.record-empty').text()).toBe('まだ記入がありません')
    pageDayBefore.find('[data-result="good"]').simulate('click')
    expect(postFn).toHaveBeenCalled()

    const pageDayAfter = mount(<PageDay {...Object.assign({}, props, postFn())} />)
    expect(pageDayAfter.find('.result-image.good').length).toBe(1)
  })
})
