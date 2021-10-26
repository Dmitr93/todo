import React, {useState} from 'react';
import List from './components/List';
import  {colors}  from './utilities/colors';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';
import {connect} from "react-redux";
import {removeFolder, addTask, removeTask, editingFolder} from "./store/actions/todo-folder";
import keyGenerator from "./utilities/keyGenerator";
import removeSvg from "./assets/img/remove.svg";
import editingSvg from "./assets/img/pencil.svg";


function App({tasksList, foldersList, removeFolder, addTask, removeTask, editingFolder}) {

    const [inputTaskValue, setInputTaskValue] = useState('');
    const [folderIdName, setFolderIdName] = useState('');
    const [editingNameFolder, setEditingNameFolder] = useState(false);
    const [inputEditingValue, setInputEditingValue] = useState('');


    const onClose = () => {
        setInputTaskValue('');
        setEditingNameFolder(false);
    };

    const  addTaskFunc = () => {
        if (!inputTaskValue){
            alert('Введите задачу');
            return;
        }
        addTask({text: inputTaskValue, listId: folderIdName.id,});
        onClose();
    };

    const  editingList = () => {
        if (!inputEditingValue){
            alert('Введите новое название списка');
            return;
        }
        editingFolder({name: inputEditingValue, id: folderIdName.id });
        setInputEditingValue('');
        onClose()
    };

    const lists = (foldersList.folders.map(item => {
      item.color = colors.filter(
          color => color.id === item.colorId)[0].name;
      return item;
    }));

    const displayNameFolder = () => {
        let  nameFolder = '';
        foldersList.folders.filter( el => {
            if (el.id === folderIdName.id) {
                nameFolder = el.name
            }
            return nameFolder
        });
        return nameFolder
    };


    return (
    <div className='todo'>
      <aside className="todo__sidebar">
        <div className="all-lists">
           <img src={listSvg} alt="List icon"/>
          <span>
            Все задачи
          </span>
        </div>
        <List setFolderIdName={setFolderIdName} items={lists} removeFolder={removeFolder} />
        <AddList/>
      </aside>

        {displayNameFolder() ?
            <div className="tasks">
                <div className="tasks__title">
                    <h3 >{displayNameFolder()}
                        <button onClick={() => setEditingNameFolder(true)} className="tasks__editing-folder">
                            <img src={editingSvg} alt="pencil"/>
                        </button>
                    </h3>


                    {editingNameFolder &&
                        <div className="editing-folder">
                            <input value ={inputEditingValue}
                                   onChange={ e => setInputEditingValue(e.target.value)}
                                   placeholder="Новое название папки"
                                   type="text"
                                   className="editing-folder__input" />

                            <button className="editing-folder__btn" onClick={() => editingList()}>Применить</button>
                            <button className="editing-folder__btn" onClick={() => onClose()}>Закрыть</button>
                        </div>}
                </div>

                <ul className="tasks__list">
                    {tasksList.tasks.map(item  => (
                        (item.listId === folderIdName.id)&&
                        <li className="tasks__item" key={keyGenerator()}>
                            <span>{item.text}</span>
                            <button onClick={() => removeTask(item.id)} className="tasks__btn-remove-item">
                                <img src={removeSvg} alt="Remove icon"/>
                            </button>
                        </li>
                     ))}
                </ul>
                <div>
                    <input className="tasks__input" type="text" placeholder="Текст задачи" value ={inputTaskValue} onChange={ e => setInputTaskValue(e.target.value)}/>
                    <button className="tasks__add-task-btn" onClick={addTaskFunc}>Добавить задачу</button>
                </div>
            </div> :
            <h3 className="tasks__void">Задачи отсутсвуют</h3>
        }
    </div>
  );
}

const mapStateToProps = (state) => ({
  foldersList: state.todo,
  tasksList: state.todo,
});


const mapDispatchToProps = (dispatch) => ({
    removeFolder: (id) => dispatch(removeFolder(id)),
    editingFolder: (infoFolder) => dispatch(editingFolder(infoFolder)),
    addTask: (taskName) => dispatch(addTask(taskName)),
    removeTask: (id) => dispatch(removeTask(id)),


});


export default connect(mapStateToProps, mapDispatchToProps) (App);
