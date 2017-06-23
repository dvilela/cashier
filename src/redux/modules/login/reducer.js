import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
 } from './actions';

const initialState = {
  isLoading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;

export const getToken = () => localStorage.getItem('yuki');
export const getError = (state) => state.login.error;
export const getLoading = (state) => state.login.isLoading;
