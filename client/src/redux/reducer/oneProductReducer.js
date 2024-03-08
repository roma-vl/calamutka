import {FETCH_ONE_PRODUCT_FAILURE, FETCH_ONE_PRODUCT_REQUEST, FETCH_ONE_PRODUCT_SUCCESS} from "../actions/oneProductActions";

const initialState = {
  product: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null
      };
    case FETCH_ONE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
