export const FETCH_ONE_PRODUCT_REQUEST = 'FETCH_ONE_PRODUCT_REQUEST';
export const FETCH_ONE_PRODUCT_SUCCESS = 'FETCH_ONE_PRODUCT_SUCCESS';
export const FETCH_ONE_PRODUCT_FAILURE = 'FETCH_ONE_PRODUCT_FAILURE';

export const fetchOneProductRequest = () => {
  return {
    type: FETCH_ONE_PRODUCT_REQUEST
  };
};

export const fetchOneProductSuccess = (product) => {
  return {
    type: FETCH_ONE_PRODUCT_SUCCESS,
    payload: product
  };
};

export const fetchOneProductFailure = (error) => {
  return {
    type: FETCH_ONE_PRODUCT_FAILURE,
    payload: error
  };
};
