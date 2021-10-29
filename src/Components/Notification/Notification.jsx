import classNames from 'classnames';
import React from 'react';
import './Notification.css';

const Notification = ({ children, isError, show }) => {
  return (
    <>
      {children &&
        ((
          <div className={classNames('notification', { error: isError, active: show })}>
            {children}
          </div>
        ) || <div></div>)}
    </>
  );
};

export default Notification;
