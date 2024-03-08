import { combineReducers } from 'redux';
import cartReducer from './reducer/cartReducer';
import productReducer from "./reducer/productReducer";
import oneProductReducer from "./reducer/oneProductReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  user:       userReducer,
  cart:       cartReducer,
  product:    productReducer,
  oneProduct: oneProductReducer
});

export default rootReducer;
