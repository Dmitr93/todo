import {ADD_FOLDER, REMOVE_FOLDER} from "../constants";

export function addFolder(folderName) {
    return {
        type: ADD_FOLDER,
        payload: folderName
    }
}

export function removeFolder(id) {
    return {
        type: REMOVE_FOLDER,
        payload: id
    }
}
