export const fetchRootProps = (url, { pushState }, callback) => {
  return {
    type: 'FETCH_ROOT_RROPS_REQUESTED',
    url: url,
    pushState: pushState,
    callback: callback,
  }
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
