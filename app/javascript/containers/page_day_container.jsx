import { connect } from 'react-redux'
import PageDay from '../components/page_day'

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

const PageDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageDay)

export default PageDayContainer;
