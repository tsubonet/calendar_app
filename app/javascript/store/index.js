import { applyMiddleware, createStore } from 'redux'
//import thunk from 'redux-thunk'
import rootReducer from '../reducers/index.js'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    //applyMiddleware(thunk, logger)
  );
  return store;
}
