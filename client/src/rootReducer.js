import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import productReducer from "./productReducer";
import oneProductReducer from "./oneProductReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user:       userReducer,
  cart:       cartReducer,
  product:    productReducer,
  oneProduct: oneProductReducer
});

export default rootReducer;
