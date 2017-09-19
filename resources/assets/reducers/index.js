import { combineReducers } from 'redux';
import user from './user';
import palette from './palette';
import contextMenu from './contextMenu';
import modal from './modal';
import board from './board';

const plugboardReducers = combineReducers({
  user,
  palette,
  modal,
  board,
  contextMenu
});

export default plugboardReducers;
