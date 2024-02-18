import {applyMiddleware, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer.js';
import localstorageMiddleware from "./localstorageMiddleware";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, localstorageMiddleware)
);

export default store;
