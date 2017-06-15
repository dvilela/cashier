import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  START_DELETE,
  END_DELETE
} from './actions';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  deleting: []
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
    case START_DELETE:
      return Object.assign({}, state, {
        deleting: state.deleting.concat(state.data.filter((account) => account._id === action.accountId))
      });
    case END_DELETE:
      return Object.assign({}, state, {
        deleting: state.deleting.filter((account) => account._id !== action.accountId)
      });
    default:
      return state;
  }
};

export default reducer;

export const getAccounts = (state) => state.accounts.data;

export const getDeletingAccounts = (state) => state.accounts.deleting;
