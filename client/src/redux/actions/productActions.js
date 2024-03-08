export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
};
