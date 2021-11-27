import React from 'react';
import './notification.scss';
import PropTypes from 'prop-types';

function Notification({ text }) {
  return (
    <div className="notification">
      <span>{text}</span>
    </div>
  );
}
//
Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
