import {ADD_FOLDER, REMOVE_FOLDER} from "../constants";
import  keyGenerator from './../../utilities/keyGenerator';


const initialState = {
    folders: [
        { "id": keyGenerator(), "name": "Покупки", "colorId": 5 },
        { "id": keyGenerator(), "name": "Фронтенд", "colorId": 4 },
        { "id": keyGenerator(), "name": "Фильмы", "colorId": 3 },
        { "id": keyGenerator(), "name": "Книги", "colorId": 2},
        { "id": keyGenerator(), "name": "Личное ", "colorId": 1 }
    ],
    tasks: [
        { "id": 1, "listId": 2, "text": "Изучить JavaScript" },
        { "id": 2, "listId": 2, "text": "Изучить паттерны проектирования" },
        { "id": 3, "listId": 2, "text": "Hooks" },
        { "id": 4, "listId": 2, "text": "Redux" }
    ],
};



export default function Todo(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLDER:
            const { folders } = {...state};
            const newFolder = {
                id: Math.floor(Math.random() * 100),
                ...action.payload
            };
            folders.push(newFolder);
            return {...state, folders};

        case REMOVE_FOLDER:
            const removedFolder = state.folders.filter(el=> el.id !== action.payload);
            return {...state, folders: removedFolder};


        default:
            return state;
    }

}

