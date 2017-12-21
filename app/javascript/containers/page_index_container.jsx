import { connect } from 'react-redux'
import { fetchData } from '../actions/records'
import PageIndex from '../components/page_index'

const mapStateToProps = (state) => {
  return {
    date: state.date,
    records: state.records,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const PageIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIndex)

export default PageIndexContainer;
