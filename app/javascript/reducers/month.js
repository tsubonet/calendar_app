export default function reducer(state = '', action) {
  switch (action.type) {
    case 'GET_MONTH': {
      return action.month
    }
    default: {
      return state
    }
  }
}
