import { sendGet } from "../utils/utils"
import NProgress from "nprogress"

export const fetchData = (url) => {
  return dispatch => {
    NProgress.start();
    sendGet(url)
    .then((response) => {

      if (typeof response.records !== 'undefined') {
        dispatch({
          type: 'GET_RECORDS',
          records: response.records
        });
      }
      if (typeof response.record !== 'undefined') {
        dispatch({
          type: 'GET_RECORD',
          record: response.record
        });
      }
      dispatch({
        type: 'GET_DATE',
        date: response.date
      });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  };
}
