import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import productReducer from "./productReducer";
import oneProductReducer from "./oneProductReducer";

const rootReducer = combineReducers({
  cart:       cartReducer,
  product:    productReducer,
  oneProduct: oneProductReducer
});

export default rootReducer;
