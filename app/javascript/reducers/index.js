import { combineReducers } from 'redux'
import actionPath from './action_path'
import date from './date'
import record from './record'
import records from './records'
import recordsYear from './records_year'

const mainApp = combineReducers({
  actionPath,
  date,
  record,
  records,
  recordsYear,
})

export default mainApp
