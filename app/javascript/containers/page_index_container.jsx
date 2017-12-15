import { connect } from 'react-redux'
import PageIndex from '../components/page_index'

const mapStateToProps = (state) => {
  return {
    year: state.year,
    month: state.month,
    records: state.records,
  }
}

const PageIndexContainer = connect(
  mapStateToProps
)(PageIndex)

export default PageIndexContainer;
