import React from 'react';
import List from './components/List';
import  {colors}  from './utilities/colors';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';
import {connect} from "react-redux";
import {removeFolder} from "./store/actions/todo-folder";



function App({foldersList, removeFolder}) {

    const lists = (foldersList.todo.folders.map(item => {
      item.color = colors.filter(
          color => color.id === item.colorId)[0].name;
      return item;
    }));

    const tasks = () => {
        const nameFolder = lists
        console.log(nameFolder);
    }

  return (
    <div className='todo'>
      <aside className="todo__sidebar">

        <div className="allLists">
           <img src={listSvg} alt="List icon"/>
          <span>
            Все задачи
          </span>
        </div>
        <List tasks={tasks} items={lists}  removeFolder={removeFolder} />
        <AddList  />

      </aside>

        <div className="tasks">
            <h1>{lists.item}</h1>
            <input type="text"/>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  foldersList: state,
});

const mapDispatchToProps = (dispatch) => ({
    removeFolder: (id) => dispatch(removeFolder(id))
});


export default connect(mapStateToProps, mapDispatchToProps) (App);
