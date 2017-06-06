import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accounts from './accounts/reducer';
import balance from './balance/reducer';

const reducer = combineReducers({
  accounts,
  balance,
  form: formReducer
});

export default reducer;
