import { sendGet, sendPost, sendPatch, sendDelete } from "./utils"

export const deleteRecord = (record) => {
  return sendDelete(`/records/${record.id}`)
}

export const patchRecord = (record, result) => {
  return (
    sendPatch(`/records/${record.id}`, {
      result: result,
    })
  )
}

export const postRecord = (date, result) => {
  return (
    sendPost('/records', {
      result: result,
      done_on: `${date.year}-${date.month}-${date.day}`,
    })
  )
}
