import React from 'react';
import './Badge.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// TODO: Разве className не должен сразу падать кооренному очернему элементу? Проверить
const Badge = ({ color, onClick, className }) => <button type="button" onClick={onClick} className={classNames('badge', { [`badge--${color}`]: color }, className)}> </button>;

Badge.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired,
};
export default Badge;
