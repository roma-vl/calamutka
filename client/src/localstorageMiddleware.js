import {LOAD_CART_FROM_LOCAL_STORAGE, SAVE_CART_TO_LOCAL_STORAGE} from "./cartActions";

const localstorageMiddleware = store => next => action => {
  switch (action.type) {
    case SAVE_CART_TO_LOCAL_STORAGE: {
      const { products } = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(products));
      break;
    }
    default:
      break;
  }

  return next(action);
};
export default localstorageMiddleware;
