import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import removeSvg from '@img/remove.svg';
import editingSvg from '@img/pencil.svg';
import listSvg from '@img/list.svg';

import List from './components/List';
import colors from './utilities/colors';
import AddList from './components/AddList';
import Notification from './components/uikit/notification';
import {
  removeFolder, addTask, removeTask, editingFolder, removeAllTaskInFolder,
} from './store/actions/todo-folder';
import keyGenerator from './utilities/keyGenerator';

function App({
  tasksList, foldersList, handlerRemoveFolder, handlerAddTask,
  handlerRemoveTask, handlerEditingFolder, handlerRemoveAllTaskInFolder,
}) {
  const [inputTaskValue, setInputTaskValue] = useState('');
  const [folderIdName, setFolderIdName] = useState('');
  const [editingNameFolder, setEditingNameFolder] = useState(false);
  const [inputEditingValue, setInputEditingValue] = useState('');
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  const onClose = () => {
    setInputTaskValue('');
    setEditingNameFolder(false);
  };

  const addTaskFunc = () => {
    if (!inputTaskValue) {
      setVisibleNotification(true);
      setNotificationText('Введите название задачи');
      return;
    }

    setVisibleNotification(false);
    handlerAddTask({ text: inputTaskValue, listId: folderIdName.id });
    onClose();
  };

  const editingList = () => {
    if (!inputEditingValue) {
      setVisibleNotification(true);
      setNotificationText('Введите новое название списка');
      return;
    }

    setVisibleNotification(false);
    handlerEditingFolder({ name: inputEditingValue, id: folderIdName.id });
    setInputEditingValue('');
    onClose();
  };

  const lists = foldersList.folders.map((item) => ({
    ...item,
    color: colors.filter((color) => color.id === item.colorId)[0].name,
  }));

  const displayNameFolder = () => {
    let nameFolder = '';
    for (let i = 0; i < foldersList.folders.length; i += 1) {
      if (foldersList.folders[i].id === folderIdName.id) {
        nameFolder = foldersList.folders[i].name;
      }
    }
    return nameFolder;
  };

  return (
    <>
      <div className="todo">
        <aside className="todo__sidebar">
          <div className="all-lists">
            <img src={listSvg} alt="List icon" />
            <span>
              Все задачи
            </span>
          </div>
          <List
            setFolderIdName={setFolderIdName}
            items={lists}
            removeFolder={handlerRemoveFolder}
            handlerRemoveAllTaskInFolder={handlerRemoveAllTaskInFolder}
          />
          <AddList
            setVisibleNotification={setVisibleNotification}
            setNotificationText={setNotificationText}
          />
        </aside>

        {displayNameFolder()
          ? (
            <div className="tasks">
              <div className="tasks__title">
                <h3>
                  {displayNameFolder()}
                  <button type="button" onClick={() => setEditingNameFolder(true)} className="tasks__editing-folder">
                    <img src={editingSvg} alt="pencil" />
                  </button>
                </h3>

                {editingNameFolder
                          && (
                          <div className="editing-folder">
                            <input
                              value={inputEditingValue}
                              onChange={(e) => setInputEditingValue(e.target.value)}
                              placeholder="Новое название папки"
                              type="text"
                              className="editing-folder__input"
                            />

                            <button type="button" className="editing-folder__btn" onClick={() => editingList()}>Применить</button>
                            <button type="button" className="editing-folder__btn" onClick={() => onClose()}>Закрыть</button>
                          </div>
                          )}

              </div>

              <ul className="tasks__list">
                {tasksList.tasks.map((item) => (
                  item.listId === folderIdName.id
                          && (
                          <li className="tasks__item" key={keyGenerator()}>
                            <span>{item.text}</span>
                            <button type="button" onClick={() => handlerRemoveTask(item.id)} className="tasks__btn-remove-item">
                              <img src={removeSvg} alt="Remove icon" />
                            </button>
                          </li>
                          )
                ))}
              </ul>

              <div>
                <input
                  className="tasks__input"
                  type="text"
                  placeholder="Текст задачи"
                  value={inputTaskValue}
                  onChange={(e) => setInputTaskValue(e.target.value)}
                />
                <button type="button" className="tasks__add-task-btn" onClick={addTaskFunc}>Добавить задачу</button>
              </div>
            </div>
          )
          : <h3 className="tasks__void">Задачи отсутсвуют</h3>}
      </div>
      {visibleNotification
      && (
        <Notification text={notificationText} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  foldersList: state.todo,
  tasksList: state.task,
});

const mapDispatchToProps = (dispatch) => ({
  handlerRemoveFolder: (id) => dispatch(removeFolder(id)),
  handlerEditingFolder: (infoFolder) => dispatch(editingFolder(infoFolder)),
  handlerAddTask: (taskName) => dispatch(addTask(taskName)),
  handlerRemoveTask: (id) => dispatch(removeTask(id)),
  handlerRemoveAllTaskInFolder: (id) => dispatch(removeAllTaskInFolder(id)),

});

App.propTypes = {
  tasksList: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  foldersList: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  handlerRemoveFolder: PropTypes.func.isRequired,
  handlerAddTask: PropTypes.func.isRequired,
  handlerRemoveTask: PropTypes.func.isRequired,
  handlerEditingFolder: PropTypes.func.isRequired,
  handlerRemoveAllTaskInFolder: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
