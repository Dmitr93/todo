import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import classNames from 'classnames';
import Badge from '../Badge';
import removeSvg from '../../assets/img/remove.svg';
import keyGenerator from '../../utilities/keyGenerator';

// TODO: Без аллиасов для аасетов и утилит?

function List({
  setFolderIdName, items, removeFolder, handlerRemoveAllTaskInFolder,
}) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li
          onClick={() => setFolderIdName({ name: item.name, id: item.id })}
          key={keyGenerator()}
          // TODO: Пояснить откуда берется item.className, в структуре folders в сторе, нет дданного параметра
          className={classNames(item.className, { active: item.active })}
        >
          <i>
            {item.icon ? (item.icon) : <Badge color={item.color} />}
          </i>
          <span>{item.name}</span>
          <button type="button" onClick={() => removeFolder(item.id) && handlerRemoveAllTaskInFolder(item.id) && setFolderIdName('')} className="btn-remove-item">
            <img className="list__remove-icon" src={removeSvg} alt="Remove icon" />
          </button>
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  setFolderIdName: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFolder: PropTypes.func.isRequired,
  handlerRemoveAllTaskInFolder: PropTypes.func.isRequired,
};

export default List;
