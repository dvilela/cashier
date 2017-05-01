import { combineReducers } from 'redux';

const reducer = combineReducers({
  hello: (s = {}, a) => s
});

export default reducer;
