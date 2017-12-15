import { connect } from 'react-redux'
import { fetchData } from '../actions/records'
import PageIndex from '../components/page_index'

const mapStateToProps = (state) => {
  return {
    year: state.year,
    month: state.month,
    records: state.records,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: (event) => {
      dispatch(fetchData(event.currentTarget.getAttribute('href')))
    },
    onFetchData2: (url) => {
      dispatch(fetchData(url))
    },
  }
}

const PageIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIndex)

export default PageIndexContainer;
