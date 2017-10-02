import { combineReducers } from 'redux';
import user from './user';
import palette from './palette';
import contextMenu from './contextMenu';
import modal from './modal';
import board from './board';
import objectif from './objectif';
import component from './component';

const plugboardReducers = combineReducers({
  user,
  palette,
  modal,
  board,
  component,
  contextMenu,
  objectif
});

export default plugboardReducers;
