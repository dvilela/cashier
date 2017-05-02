import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from './actions';

const initialState = {
  data: [],
  isLoading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.response
      });
    case LOAD_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
};

export default reducer;

export const getAccounts = (state) => state.accounts.data;
