import {
  ADD_TASK, REMOVE_TASK, REMOVE_ALL_TASK,
} from '../constants';
import keyGenerator from '../../utilities/keyGenerator';

const initialState = {
  tasks: [],
};

export default function Task(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      const { tasks } = { ...state };
      const newTask = {
        id: keyGenerator(),
        ...action.payload,
      };
      tasks.push(newTask);
      return { ...state, tasks };

    case REMOVE_TASK:
      const removeTask = state.tasks.filter((el) => el.id !== action.payload);
      return { ...state, tasks: removeTask };

    case REMOVE_ALL_TASK:
      const removeAllTaskInFolder = state.tasks.filter((el) => el.listId !== action.payload);
      return { ...state, tasks: removeAllTaskInFolder };

    default:
      return state;
  }
}
