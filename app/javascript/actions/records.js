import { sendGet } from "../utils/utils"
import NProgress from "nprogress"

export const fetchData = (url) => {
  return dispatch => {
    NProgress.start();
    sendGet(url)
    .then((response) => {
      dispatch({
        type: 'GET_RECORDS',
        records: response.records
      });
      dispatch({
        type: 'GET_YEAR',
        year: response.year
      });
      dispatch({
        type: 'GET_MONTH',
        month: response.month
      });
      dispatch({
        type: 'GET_DAY',
        day: response.day
      });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  };
}
