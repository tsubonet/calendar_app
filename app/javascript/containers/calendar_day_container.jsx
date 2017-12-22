import { connect } from 'react-redux'
import CalendarDay from '../components/calendar_day'

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

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay)

export default CalendarDayContainer;
