import api from '../../../api/accounts';

// TRANSACTIONS - load actions
export const LOAD_FROM_ACCOUNTS = 'cashier/transactions/LOAD_FROM_ACCOUNTS';

// TRANSACTIONS - edit actions
export const EDIT_START = 'cashier/transactions/EDIT_START';
export const EDIT_STOP = 'cashier/transactions/EDIT_STOP';

// TRANSACTIONS - update actions
export const UPDATE = 'cashier/transactions/UPDATE';
export const UPDATE_SUCCESS = 'cashier/transactions/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'cashier/transactions/UPDATE_FAIL';

// TRANSACTIONS - save actions
export const SAVE_START = 'cashier/transactions/SAVE_START';
export const SAVE_STOP = 'cashier/transactions/SAVE_STOP';
export const SAVE = 'cashier/transactions/SAVE';
export const SAVE_SUCCESS = 'cashier/transactions/SAVE_SUCCESS';
export const SAVE_FAIL = 'cashier/transactions/SAVE_FAIL';

// TRANSACTIONS - delete actions
export const DELETE = 'cashier/transactions/DELETE';
export const DELETE_SUCCESS = 'cashier/transactions/DELETE_SUCCESS';
export const DELETE_FAIL = 'cashier/transactions/DELETE_FAIL';

export const save = (accountId, transaction) => (dispatch) => {
  dispatch({ type: SAVE });

  return api.transactions.post(accountId, transaction).then(
    () =>
      dispatch({
        type: SAVE_SUCCESS
      }),
    (error) =>
      dispatch({
        type: SAVE_FAIL,
        error: error.message
      })
  );
};

export const update = (accountId, transaction) => (dispatch) => {
  dispatch({ type: UPDATE });

  return api.transactions.put(accountId, transaction).then(
    () =>
      dispatch({
        type: UPDATE_SUCCESS
      }),
    (error) =>
      dispatch({
        type: UPDATE_FAIL,
        error: error.message
      })
  );
};

export const remove = (accountId, transactionId) => (dispatch) => {
  dispatch({ type: DELETE });

  return api.transactions.delete(accountId, transactionId).then(
    () =>
      dispatch({
        type: DELETE_SUCCESS
      }),
    (error) =>
      dispatch({
        type: DELETE_FAIL,
        error: error.message
      })
  );
};

export const editStart = (transactionId) => (dispatch) =>
  dispatch({ type: EDIT_START, transactionId });

export const editStop = (transactionId) => (dispatch) =>
  dispatch({ type: EDIT_STOP, transactionId });

export const saveStart = () => (dispatch) =>
  dispatch({ type: SAVE_START });

export const saveStop = () => (dispatch) =>
  dispatch({ type: SAVE_STOP });
