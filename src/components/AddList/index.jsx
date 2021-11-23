import './AddButtonList.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import { colors } from '../../utilities/colors';
import closeSvg from '../../assets/img/close.svg';
import { addFolder } from '../../store/actions/todo-folder';

const AddList = ({ addFolder, setVisibleNotification, setNotificationText }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };
  const addList = () => {
    if (!inputValue) {
      setVisibleNotification(true);
      setNotificationText('Введите название списка');
      return;
    }

    setVisibleNotification(false);
    const color = colors.filter((c) => c.id === selectedColor)[0].name;
    addFolder({ name: inputValue, colorId: selectedColor, color });
    onClose();
  };

  return (
    <div className="add-list">
      <button
        className="add-list__btn"
        onClick={() => setVisiblePopup(true)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Добавить список</span>
      </button>
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />

          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
               // TODO: Что будет если завтра я добавлю цвет с id 5 а в списке уже будет иметься id 5?
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="button">Добавить</button>
        </div>
      )}
    </div>
  );
};

AddList.propTypes = {
  addFolder: PropTypes.func.isRequired,
  setVisibleNotification: PropTypes.func.isRequired,
  setNotificationText: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addFolder: (folderName) => dispatch(addFolder(folderName)),
});

export default connect(null, mapDispatchToProps)(AddList);
