import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { deleteRecord, patchRecord, postRecord } from './api'


function* handleDeleteRecord(action) {
  const { status } = yield call(deleteRecord, action.record);
  if (status === 'success') {
    yield put({type: 'DELETE_RECORD'});
  }
}

function* handlePatchRecord(action) {
  const { status, record } = yield call(patchRecord, action.record, action.result);
  if (status === 'success') {
    yield put({type: 'GET_RECORD', record: record});
  }
}

function* handlePostRecord(action) {
  const { status, record } = yield call(postRecord, action.date, action.result);
  if (status === 'success') {
    yield put({type: 'GET_RECORD', record: record});
  }
}


function* mySaga() {
  yield takeLatest('DELETE_RECORD_REQUESTED', handleDeleteRecord);
  yield takeLatest('PATCH_RECORD_REQUESTED', handlePatchRecord);
  yield takeLatest('POST_RECORD_REQUESTED', handlePostRecord);
}

export default mySaga;
