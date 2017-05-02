import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from './actions';

const initialState = {
  data: {},
  loadings: {},
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          [action.accountId]: true
        },
        errors: {
          ...state.errors,
          [action.accountId]: null
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.accountId]: action.response
        },
        loadings: {
          ...state.loadings,
          [action.accountId]: false
        },
        errors: {
          ...state.errors,
          [action.accountId]: null
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          [action.accountId]: false
        },
        errors: {
          ...state.errors,
          [action.accountId]: action.error
        }
      };
    default:
      return state;
  }
};

export default reducer;

export const getBalance = (state, accountId) => state.balance.data[accountId];

export const isLoading  = (state, accountId) => state.balance.loadings[accountId];
