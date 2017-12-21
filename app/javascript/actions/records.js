import { sendGet } from "../utils"
import NProgress from "nprogress"

export const fetchData = (url) => {
  return dispatch => {
    //NProgress.start();
    sendGet(url)
    .then((response) => {
      dispatch({
        type: 'GET_DATE',
        date: response.date
      });
      dispatch({
        type: 'GET_ACTION_PATH',
        actionPath: response.actionPath
      });
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
    }).then(() => {
      window.scrollTo(0, 0);
      //NProgress.done();
    }).catch(() => {
      //NProgress.done();
    });
  };
}
