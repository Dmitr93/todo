import {
  ADD_FOLDER, EDITING_FOLDER, REMOVE_FOLDER,
} from '../constants';
import keyGenerator from '../../utilities/keyGenerator';

const initialState = {
  folders: [
    { id: keyGenerator(), name: 'Покупки', colorId: 5 },
    { id: keyGenerator(), name: 'Фронтенд', colorId: 4 },
    { id: keyGenerator(), name: 'Фильмы', colorId: 3 },
    { id: keyGenerator(), name: 'Книги', colorId: 2 },
    { id: keyGenerator(), name: 'Личное ', colorId: 1 },
  ],
};

export default function Todo(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER: {
      const { folders } = { ...state };
      const newFolder = {
        id: keyGenerator(),
        ...action.payload,
      };
      folders.push(newFolder);
      return {
        ...state,
        folders,
      };
    }
    case REMOVE_FOLDER: {
      const removeFolder = state.folders.filter((el) => el.id !== action.payload);
      return {
        ...state,
        folders: removeFolder,
      };
    }
    case EDITING_FOLDER: {
      const editingFolder = state.folders.map((el) => {
        const folder = { ...el };

        if (el.id === action.payload.id) {
          folder.name = action.payload.name;
        }
        return folder;
      });
      return {
        ...state,
        folders: editingFolder,
      };
    }
    default:
      return state;
  }
}
