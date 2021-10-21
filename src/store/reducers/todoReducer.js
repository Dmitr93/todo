import {ADD_FOLDER, ADD_TASK, REMOVE_FOLDER, REMOVE_TASK} from "../constants";
import  keyGenerator from './../../utilities/keyGenerator';


const initialState = {
    folders: [
        { "id": keyGenerator(), "name": "Покупки", "colorId": 5 },
        { "id": keyGenerator(), "name": "Фронтенд", "colorId": 4 },
        { "id": keyGenerator(), "name": "Фильмы", "colorId": 3 },
        { "id": keyGenerator(), "name": "Книги", "colorId": 2},
        { "id": keyGenerator(), "name": "Личное ", "colorId": 1 }
    ],
    tasks: [],
};



export default function Todo(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLDER:
            const { folders } = {...state};
            const newFolder = {
                id: keyGenerator(),
                ...action.payload
            };
            folders.push(newFolder);
            return {...state, folders};

        case REMOVE_FOLDER:
            const removeFolder = state.folders.filter(el=> el.id !== action.payload);
            return {...state, folders: removeFolder};

        case ADD_TASK:
            const { tasks } = {...state};
            const newTask = {
                id: keyGenerator(),
                ...action.payload
            };
            tasks.push(newTask);
            return {...state, tasks};

        case REMOVE_TASK:
            const removeTask = state.tasks.filter(el=> el.id !== action.payload);
            return {...state, tasks: removeTask};


        default:
            return state;
    }

}

