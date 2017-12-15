export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_DATE': {
      return action.date
    }
    default: {
      return state
    }
  }
}
