import React from 'react';
import List from './components/List';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';
import {connect} from "react-redux";
import {addFolder, removeFolder} from "./store/actions/todo-folder";



function App({foldersList, removeFolder}) {

    const lists = (foldersList.todo.folders.map(item => {
      item.color = foldersList.todo.colors.filter(
          color => color.id === item.colorId)[0].name;
      return item;
    }));

  return (
    <div className='todo'>
      <aside className="todo__sidebar">

        <div className="allLists">

           <img src={listSvg} alt="List icon"/>
          <span>
            Все задачи
          </span>

        </div>
        <List items={lists}  removeFolder={removeFolder} />
        <AddList  />

      </aside>
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
