import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers);

export default reducer;
