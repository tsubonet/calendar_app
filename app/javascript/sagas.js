import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getRecord, postRecord, patchRecord, deleteRecord, loadingStart, loadingEnd } from './api'

function* handleFetchPootProps(action) {
  try {
    yield call(loadingStart)
    const { actionPath, date, record, records, recordsYear } = yield call(getRecord, action.payload.url)
    if (action.payload.pushState) {
      history.pushState(null, '', action.payload.url)
    }
    yield put({ type: 'GET_ACTION_PATH', actionPath })
    yield put({ type: 'GET_DATE', date })
    if (typeof record !== 'undefined') {
      yield put({ type: 'GET_RECORD', record })
    }
    if (typeof records !== 'undefined') {
      yield put({ type: 'GET_RECORDS', records })
    }
    if (typeof recordsYear !== 'undefined') {
      yield put({ type: 'GET_RECORDSYEAR', recordsYear })
    }
    yield call(loadingEnd)
    window.scrollTo(0, 0)
  } catch (e) {
    yield call(loadingEnd)
  }
}

function* handlePostRecord(action) {
  yield call(loadingStart)
  const { status, record, txt } = yield call(postRecord, action.payload.date, action.payload.result)
  if (status === 201) {
    yield put({ type: 'GET_RECORD', record })
  }
  yield call(loadingEnd)
}

function* handlePatchRecord(action) {
  yield call(loadingStart)
  const { status, record } = yield call(patchRecord, action.payload.record, action.payload.result)
  if (status === 200) {
    yield put({ type: 'GET_RECORD', record })
  }
  yield call(loadingEnd)
}

function* handleDeleteRecord(action) {
  yield call(loadingStart)
  const { status } = yield call(deleteRecord, action.payload.record)
  if (status === 200) {
    yield put({ type: 'DELETE_RECORD' })
  }
  yield call(loadingEnd)
}

function* mySaga() {
  yield takeLatest('FETCH_ROOT_RROPS_REQUESTED', handleFetchPootProps)
  yield takeLatest('POST_RECORD_REQUESTED', handlePostRecord)
  yield takeLatest('PATCH_RECORD_REQUESTED', handlePatchRecord)
  yield takeLatest('DELETE_RECORD_REQUESTED', handleDeleteRecord)
}

export default mySaga
