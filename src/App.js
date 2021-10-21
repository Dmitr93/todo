import React, {useState} from 'react';
import List from './components/List';
import  {colors}  from './utilities/colors';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';
import {connect} from "react-redux";
import {removeFolder, addTask, removeTask} from "./store/actions/todo-folder";
import keyGenerator from "./utilities/keyGenerator";
import removeSvg from "./assets/img/remove.svg";
import editingSvg from "./assets/img/pencil.svg";





function App({tasksList, foldersList, removeFolder, addTask, removeTask}) {

    const [inputValue, setInputValue] = useState('');
    const [taskIdName, setTaskIdName] = useState('');

    const onClose = () => {
        setInputValue('');
    };
    const  addTaskFunc = () => {

        if (!inputValue){
            alert('Введите задачу');
            return;
        }
        addTask({text: inputValue, listId: taskIdName.id,});
        onClose();
    };

    const getIdName = (name, id) => {
        setTaskIdName({name: name, id: id});
    };

    const lists = (foldersList.folders.map(item => {
      item.color = colors.filter(
          color => color.id === item.colorId)[0].name;
      return item;
    }));

    console.log(tasksList);


    return (
    <div className='todo'>
      <aside className="todo__sidebar">

        <div className="all-lists">
           <img src={listSvg} alt="List icon"/>
          <span>
            Все задачи
          </span>
        </div>
        <List addTaskFunc={getIdName} items={lists}  removeFolder={removeFolder} />
        <AddList/>
      </aside>
        {taskIdName &&
            <div className="tasks">
                <div className="tasks__title">
                    <h3 >{taskIdName.name}</h3>
                    <button className="tasks__editing-folder">
                        <img src={editingSvg} alt="pencil"/>
                    </button>
                </div>
                <ul className="tasks__list">
                    {tasksList.tasks.map(item  => (
                        (item.listId === taskIdName.id)&&
                        <li className="tasks__item" key={keyGenerator()}>
                            <span>{item.text}</span>
                            <button onClick={() => removeTask(item.id)} className="tasks__btn-remove-item">
                                <img src={removeSvg} alt="Remove icon"/>
                            </button>
                        </li>
                     ))}
                </ul>
                <input className="tasks__input" type="text" placeholder="Текст задачи" value ={inputValue} onChange={ e => setInputValue(e.target.value)}/>
                <button className="tasks__add-task-btn" onClick={addTaskFunc}>Добавить задачу</button>
            </div>
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
    addTask: (taskName) => dispatch(addTask(taskName)),
    removeTask: (id) => dispatch(removeTask(id)),


});


export default connect(mapStateToProps, mapDispatchToProps) (App);
