import { combineReducers } from 'redux';
import user from './user';
import palette from './palette';

const plugboardReducers = combineReducers({
  user,
  palette
});

export default plugboardReducers;
