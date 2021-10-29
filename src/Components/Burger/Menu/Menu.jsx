import classNames from 'classnames';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ header, items, active, setMenuActive }) => {
  if (active) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
  return (
    <div className={classNames('menu', { active: active })} onClick={() => setMenuActive(false)}>
      <div className="menu__content" onClick={(e) => e.stopPropagation()}>
        <div className="menu__header">{header}</div>
        <ul>
          {items.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.href}>{item.value}</Link>
                <span className="material-icons">{item.icon}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(Menu);
