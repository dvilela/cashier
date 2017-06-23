import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accounts from './accounts/reducer';
import balance from './balance/reducer';
import transactions from './transactions/reducer';
import modal from './modal/reducer';
import users from './users/reducer';
import login from './login/reducer';

const reducer = combineReducers({
  accounts,
  balance,
  transactions,
  modal,
  users,
  login,
  form: formReducer
});

export default reducer;
