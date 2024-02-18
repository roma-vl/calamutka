// cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const SAVE_CART_TO_LOCAL_STORAGE = 'SAVE_CART_TO_LOCAL_STORAGE';
export const LOAD_CART_FROM_LOCAL_STORAGE = 'LOAD_CART_FROM_LOCAL_STORAGE'

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId
  };
};

export const increaseQuantity = (productId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: productId
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: productId
  };
};

export const saveCartToLocalStorage = () => ({
  type: SAVE_CART_TO_LOCAL_STORAGE
});

export const loadCartFromLocalStorage = () => ({
  type: LOAD_CART_FROM_LOCAL_STORAGE
});

