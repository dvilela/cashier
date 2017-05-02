import { combineReducers } from 'redux';
import accounts from './accounts/reducer';
import balance from './balance/reducer';

const reducer = combineReducers({
  accounts,
  balance
});

export default reducer;
