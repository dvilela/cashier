import api from '../../../api/accounts';

export const LOAD = 'cashier/accounts/LOAD';
export const LOAD_SUCCESS = 'cashier/accounts/LOAD_SUCCESS';
export const LOAD_FAIL = 'cashier/accounts/LOAD_FAIL';
export const SAVE = 'cashier/accounts/SAVE';
export const SAVE_SUCESS = 'cashier/accounts/SAVE_SUCCESS';
export const SAVE_FAIL = 'cashier/accounts/SAVE_FAIL';

export const fetchData = () => (dispatch) => {

  dispatch({ type: LOAD });

  return api.fetchData().then(
    (data) =>
      dispatch({
        type: LOAD_SUCCESS,
        response: data
      }),
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
        type: SAVE_SUCESS
      }),
    (error) =>
      dispatch({
        type: SAVE_FAIL,
        error: error.message
      })
  );
};

export const saveTransaction = (accountId, transaction) => (dispatch) => {
  dispatch({ type: SAVE });

  return api.postTransaction(accountId, transaction).then(
    () =>
      dispatch({
        type: SAVE_SUCESS
      }),
    (error) =>
      dispatch({
        type: SAVE_FAIL,
        error: error.message
      })
  );
};
