import {ADD_FOLDER, REMOVE_FOLDER, ADD_TASK, REMOVE_TASK, EDITING_FOLDER} from "../constants";

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

export function addTask(taskName) {
    return {
        type: ADD_TASK,
        payload: taskName
    }
}

export function removeTask(id) {
    return {
        type: REMOVE_TASK,
        payload: id
    }
}
export function editingFolder(infoFolder) {
    return {
        type: EDITING_FOLDER,
        payload: infoFolder
    }
}
