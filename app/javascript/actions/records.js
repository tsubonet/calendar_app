import { sendGet, sendPost, sendPatch, sendDelete } from "../utils"
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
  return {
    type: 'POST_RECORD_REQUESTED',
    date: date,
    result: result,
  }
}

export const patchRecord = (record, result) => {
  return {
    type: 'PATCH_RECORD_REQUESTED',
    record: record,
    result: result,
  }
}

export const deleteRecord = (record) => {
  return {
    type: 'DELETE_RECORD_REQUESTED',
    record: record,
  }
}
