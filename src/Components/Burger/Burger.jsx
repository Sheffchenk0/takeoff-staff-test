import React, { memo, useState } from 'react';
import Menu from './Menu/Menu';
import './Burger.css';

const Burger = ({ items }) => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <div className="burger-btn" onClick={() => setMenuActive((bool) => !bool)}>
        <span />
      </div>
      <Menu active={menuActive} setMenuActive={setMenuActive} header="Меню" items={items} />
    </>
  );
};

export default memo(Burger);
