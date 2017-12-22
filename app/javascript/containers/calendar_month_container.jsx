import { connect } from 'react-redux'
import CalendarMonth from '../components/calendar_month'

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

const CalendarMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMonth)

export default CalendarMonthContainer;
