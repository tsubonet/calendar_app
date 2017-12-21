import { connect } from 'react-redux'
import { fetchData } from '../actions/records'
import PageDetail from '../components/page_detail'

const mapStateToProps = (state) => {
  return {
    date: state.date,
    record: state.record,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const PageDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageDetail)

export default PageDetailContainer;
