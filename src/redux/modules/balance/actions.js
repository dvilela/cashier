import api from '../../../api/accounts';

export const LOAD = 'cashier/balance/LOAD';
export const LOAD_SUCCESS = 'cashier/balance/LOAD_SUCCESS';
export const LOAD_FAIL = 'cashier/balance/LOAD_FAIL';

export const fetchBalance = (accountId) => (dispatch) => {

  dispatch({
    type: LOAD,
    accountId
  });

  return api.fetchBalance(accountId).then(
    (data) =>
      dispatch({
        type: LOAD_SUCCESS,
        response: data,
        accountId
      }),
    (error) =>
      dispatch({
        type: LOAD_FAIL,
        error: error.message,
        accountId
      })
  );
};
