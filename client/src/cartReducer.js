// cartReducer.js
import {ADD_TO_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART} from './cartActions';

const initialState = {
  products: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
        )
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        )
      };
    default:
      return state;
  }
};

export default cartReducer;
