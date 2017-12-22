import { connect } from 'react-redux'
import CalendarYear from '../components/calendar_year'

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

const CalendarYearContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarYear)

export default CalendarYearContainer;
