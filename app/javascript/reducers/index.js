import { combineReducers } from 'redux'
import year from './year.js'
import month from './month.js'
import records from './records.js'

const mainApp = combineReducers({
  year,
  month,
  records,
});

export default mainApp;
