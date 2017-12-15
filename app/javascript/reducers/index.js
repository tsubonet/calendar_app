import { combineReducers } from 'redux'
import date from './date'
import records from './records'
import record from './record'

const mainApp = combineReducers({
  date,
  records,
  record,
});

export default mainApp;
