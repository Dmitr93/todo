import React from 'react';
import './List.scss';
import classNames from 'classnames';
import  Badge from '../Badge';
import  removeSvg from '../../assets/img/remove.svg';
import  keyGenerator from './../../utilities/keyGenerator'


function List ({setFolderIdName,  items, removeFolder})  {



    return (
      <ul className="list">
         {items.map(item => (
            <li
                onClick={() => setFolderIdName({name: item.name, id: item.id})}
                key={keyGenerator()}
                className={classNames(item.className, { 'active': item.active })}>
               <i>
                  {item.icon ? (item.icon) : <Badge color={item.color}/>}
               </i>
               <span>{item.name}</span>
               <button onClick={() => removeFolder(item.id) && setFolderIdName("")} className="btn-remove-item">
                   <img className="list__remove-icon" src={removeSvg} alt="Remove icon"/>
               </button>
            </li>
         ))}
      </ul >
   )
}



export default List;
