export const LOGIN = 'cashier/login/LOGIN';
export const LOGIN_SUCCESS = 'cashier/login/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'cashier/login/LOGIN_FAIL';
export const LOGOUT = 'cashier/login/LOGOUT';
export const LOGOUT_SUCCESS = 'cashier/login/LOGOUT';
export const LOGOUT_FAIL = 'cashier/login/LOGOUT_FAIL';

import api from '../../../api/users';

export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN });

  return api.login(credentials)
    .then((token) => {
      localStorage.setItem('yuki', token);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAIL, error });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('yuki');
  dispatch({ type: LOGOUT_SUCCESS });
}
