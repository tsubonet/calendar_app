import { connect } from 'react-redux'
import PageIndex from '../components/page_index'

const mapStateToProps = (state) => {
  return { year: state.year }
}

const PageIndexContainer = connect(
  mapStateToProps
)(PageIndex)

export default PageIndexContainer;
