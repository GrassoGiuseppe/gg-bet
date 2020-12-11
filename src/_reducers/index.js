import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { data } from './chart.reducer';
import { list } from './list.reducer';

const appReducer = combineReducers({
  authentication,
  alert,
  data,
  list
});

export default appReducer;