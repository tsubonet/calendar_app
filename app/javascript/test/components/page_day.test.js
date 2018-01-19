import React from 'react'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import PageDay from '../../components/link'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { event } = this.props
    return (
      <div>
        <span onClick={event}>Click!</span>
      </div>
    )
  }
}
function sampleFunc() {
  alert('clickされました。')
}

describe('clickイベントのテスト', () => {
  test('Appコンポーネントにイベントを渡す', () => {
    const testMock = jest.fn()
    const subject = shallow(<App event={testMock} />)
    subject.find('span').simulate('click')
    expect(testMock).toHaveBeenCalled()
  })
})
