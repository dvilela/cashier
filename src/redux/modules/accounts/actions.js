import api from '../../../api/accounts';

// ACCOUNTS - load actions
export const LOAD = 'cashier/accounts/LOAD';
export const LOAD_SUCCESS = 'cashier/accounts/LOAD_SUCCESS';
export const LOAD_FAIL = 'cashier/accounts/LOAD_FAIL';
// ACCOUNTS - save actions
export const SAVE = 'cashier/accounts/SAVE';
export const SAVE_SUCCESS = 'cashier/accounts/SAVE_SUCCESS';
export const SAVE_FAIL = 'cashier/accounts/SAVE_FAIL';
// ACCOUNTS - delete actions
export const START_DELETE = 'cashier/accounts/START_DELETE';
export const END_DELETE = 'cashier/accounts/END_DELETE';
export const DELETE = 'cashier/accounts/DELETE';
export const DELETE_SUCCESS = 'cashier/accounts/DELETE_SUCCESS';
export const DELETE_FAIL = 'cashier/accounts/DELETE_FAIL';
// ACCOUNTS - update actions
export const START_EDIT = 'cashier/accounts/START_EDIT';
export const UPDATE = 'cashier/accounts/UPDATE';
export const UPDATE_SUCCESS = 'cashier/accounts/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'cashier/accounts/UPDATE_FAIL';

// TRANSACTIONS
import { LOAD_FROM_ACCOUNTS as LOAD_TRANSACTIONS_FROM_ACCOUNTS } from '../transactions/actions';

export const fetchData = () => (dispatch) => {

  dispatch({ type: LOAD });

  return api.fetchData().then(
    (data) => {
      dispatch({
        type: LOAD_TRANSACTIONS_FROM_ACCOUNTS,
        accounts: data
      })
      dispatch({
        type: LOAD_SUCCESS,
        response: data
      });
    },
    (error) =>
      dispatch({
        type: LOAD_FAIL,
        error: error.message
      })
  );
};

export const save = (account) => (dispatch) => {
  dispatch({ type: SAVE });

  return api.post(account).then(
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

export const update = (account) => (dispatch) => {
  dispatch({ type: UPDATE });

  return api.put(account).then(
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

export const remove = (accountId) => (dispatch) => {
  dispatch({ type: DELETE });
  return api.remove(accountId).then(
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

export const startAccountDelete = (accountId) => (dispatch) =>
  dispatch({ type: START_DELETE, accountId });

export const endAccountDelete = (accountId) => (dispatch) =>
  dispatch({ type: END_DELETE, accountId });

export const editAccount = (account) => (dispatch) =>
  dispatch({ type: START_EDIT, account });
