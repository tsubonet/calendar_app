export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_RECORD': {
      return action.record
    }
    default: {
      return state
    }
  }
}
