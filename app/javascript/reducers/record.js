export default function reducer(state = null, action) {
  switch (action.type) {
    case 'GET_RECORD': {
      return action.record
    }
    default: {
      return state
    }
  }
}
