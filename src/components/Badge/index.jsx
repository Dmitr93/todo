import React from 'react';
import './Badge.scss';
import classNames from 'classnames';

// TODO: Разве className не должен сразу падать кооренному очернему элементу? Проверить
const Badge = ({ color, onClick, className }) => <i onClick={onClick} className={classNames('badge', { [`badge--${color}`]: color }, className)} />;

export default Badge;
