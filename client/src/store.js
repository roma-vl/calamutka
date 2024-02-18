import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer.js';
import localstorageMiddleware from "./localstorageMiddleware";

const store = createStore(rootReducer, applyMiddleware(localstorageMiddleware));

export default store;
