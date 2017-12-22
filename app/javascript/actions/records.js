import { sendGet } from "../utils"
import NProgress from "nprogress"

export const fetchData = (url, { pushState }) => {
  return dispatch => {
    NProgress.start();
    sendGet(url)
    .then((response) => {
      if (pushState) {
        history.pushState(null, "", url);
      }
      dispatch({
        type: 'GET_ACTION_PATH',
        actionPath: response.actionPath
      });
      dispatch({
        type: 'GET_DATE',
        date: response.date
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
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  };
}
