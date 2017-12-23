import { sendGet, sendPost, sendPatch } from "../utils"
import NProgress from "nprogress"

export const fetchRootProps = (url, { pushState }) => {
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

export const postRecord = (date, result) => {
  return dispatch => {
    sendPost('/records', {
      result: result,
      done_on: `${date.year}-${date.month}-${date.day}`,
    })
    .then((response) => {
      if (response.status === 'success') {
        dispatch({
          type: 'GET_RECORD',
          record: response.record
        });
      }
    });
  };
}

export const patchRecord = (record, result) => {
  return dispatch => {
    sendPatch(`/records/${record.id}`, {
      result: result,
    })
    .then((response) => {
      if (response.status === 'success') {
        dispatch({
          type: 'GET_RECORD',
          record: response.record
        });
      }
    });
  };
}
