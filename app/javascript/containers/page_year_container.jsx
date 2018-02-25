import { connect } from 'react-redux'
import PageYear from '../components/page_year'

const mapStateToProps = state => {
  return {
    date: state.date,
    recordsYear: state.recordsYear,
    records: state.records,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const PageYearContainer = connect(mapStateToProps, mapDispatchToProps)(PageYear)

export default PageYearContainer
