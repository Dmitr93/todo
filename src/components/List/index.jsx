import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import classNames from 'classnames';
import removeSvg from '@img/remove.svg';
import keyGenerator from '@utilities/keyGenerator';
import Badge from '../Badge';

// TODO: Без аллиасов для аасетов и утилит?

function List({
  setFolderIdName, items, removeFolder, handlerRemoveAllTaskInFolder,
}) {
  return (
    <div className="list">
      {items.map((item) => (
        <button
          id="folder"
          type="button"
          onClick={() => setFolderIdName({ name: item.name, id: item.id })}
          key={keyGenerator()}
          className={classNames({ active: item.active })}
        >
          <i>
            {item.icon ? (item.icon) : <Badge color={item.color} />}
          </i>
          <span>{item.name}</span>
          <button type="button" onClick={() => removeFolder(item.id) && handlerRemoveAllTaskInFolder(item.id) && setFolderIdName('')} className="btn-remove-item">
            <img className="list__remove-icon" src={removeSvg} alt="Remove icon" />
          </button>
        </button>
      ))}
    </div>
  );
}

List.propTypes = {
  setFolderIdName: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFolder: PropTypes.func.isRequired,
  handlerRemoveAllTaskInFolder: PropTypes.func.isRequired,
};

export default List;
