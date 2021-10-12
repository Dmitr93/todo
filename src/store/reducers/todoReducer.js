import {ADD_FOLDER, REMOVE_FOLDER} from "../constants";

const initialState = {
    folders: [
        { "id": 1, "name": "Покупки", "colorId": 5 },
        { "id": 2, "name": "Фронтенд", "colorId": 4 },
        { "id": 3, "name": "Фильмы", "colorId": 3 },
        { "id": 4, "name": "Книги", "colorId": 2},
        { "id": 5, "name": "Личное ", "colorId": 1 }
    ],
    tasks: [
        { "id": 1, "listId": 2, "text": "Изучить JavaScript" },
        { "id": 2, "listId": 2, "text": "Изучить паттерны проектирования" },
        { "id": 3, "listId": 2, "text": "Hooks" },
        { "id": 4, "listId": 2, "text": "Redux" }
    ],
    colors: [
        { "id": 1, "hex": "#C9D1D3", "name": "grey" },
        { "id": 2, "hex": "#42B883", "name": "green" },
        { "id": 3, "hex": "#64C4ED", "name": "blue" },
        { "id": 4, "hex": "#FFBBCC", "name": "pink" },
        { "id": 5, "hex": "#B6E6BD", "name": "lime" },
        { "id": 6, "hex": "#C355F5", "name": "purple" },
        { "id": 7, "hex": "#110133", "name": "black" },
        { "id": 8, "hex": "#FF6464", "name": "red" }
    ]
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

