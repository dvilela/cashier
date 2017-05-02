import api from '../../../api/accounts';

export const LOAD = 'cashier/accounts/LOAD';
export const LOAD_SUCCESS = 'cashier/accounts/LOAD_SUCCESS';
export const LOAD_FAIL = 'cashier/accounts/LOAD_FAIL';

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
  )
};
