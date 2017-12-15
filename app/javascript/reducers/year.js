export default function reducer(state = '', action) {
  switch (action.type) {
    case 'GET_YEAR': {
      return action.year
    }
    default: {
      return state
    }
  }
}
