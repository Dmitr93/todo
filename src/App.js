import React, {useState} from 'react';
import List from './components/List';
import listSvg from './assets/img/list.svg';
import AddList from './components/AddList';
import DB from './assets/DB.json';



function App() {
const  [lists, setLists] = useState(DB.lists.map(item => {
  item.color = DB.colors.filter(
      color => color.id === item.colorId)[0].name;
  console.log(item);
  return item;
}));

const onAddList = (obj) => {
  const newList = [...lists, obj];
  setLists(newList)
};
  return (
    <div className='todo'>
      <aside className="todo__sidebar">
        {/*<List items={[*/}
        {/*  {*/}
        {/*    icon: <img src={listSvg} alt="List icon" />,*/}
        {/*    name: 'Все задачи',*/}
        {/*  },*/}
        {/*]}*/}
        {/*/>*/}
        <div className="allLists">
           <img src={listSvg} alt="List icon"/>
          <span>
            Все задачи
          </span>
        </div>

        <List items={lists} isRemovable />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </aside>
    </div>
  );
}

export default App;
