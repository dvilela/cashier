import {
  LOAD_FROM_ACCOUNTS,
  EDIT_START,
  EDIT_STOP,
  DELETE,
  DELETE_SUCCESS,
  SAVE_START,
  SAVE_STOP
} from './actions';

const initialState = {
  data: {},
  deleting: {},
  editing: {},
  adding: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_FROM_ACCOUNTS:
      const reducerCallback = (transactionsData, account) => {
        transactionsData[account._id] = account.transactions
        return transactionsData;
      };
      return {
        ...state,
        data: action.accounts.reduce(reducerCallback, {})
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.transactionId]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing:  {
          ...state.editing,
          [action.transactionId]: false
        }
      };
    case DELETE:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.transactionId]: true
        }
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.transactionId]: false
        }
      }
    case SAVE_START:
      return {
        ...state,
        adding: true
      }
    case SAVE_STOP:
      return {
        ...state,
        adding: false
      }
    default:
      return state;
  }
}

export default reducer;

export const getTransactionsByAccountId = (state, accountId) => state.transactions.data[accountId];

export const getEditing = (state) => state.transactions.editing;

export const getDeleting = (state) => state.transactions.editing;

export const getAdding = (state) => state.transactions.adding;
