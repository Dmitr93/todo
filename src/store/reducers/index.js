import { combineReducers } from 'redux';
import todo from './todoReducer';
import task from './taskReducer';

export default combineReducers({
  todo, task,
});
