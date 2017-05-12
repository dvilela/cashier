import { combineReducers } from 'redux';
import accounts from './accounts/reducer';
import balance from './balance/reducer';
import transactions from './transactions/reducer';

const reducer = combineReducers({
  accounts,
  balance,
  transactions
});

export default reducer;
