import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Contact from './Contact/Contact';
import './Contacts.css';

export default function Contacts({ items }) {
  const { register, watch } = useForm();
  let watchSearch = watch('search');
  const [filteredItems, setfilteredItems] = useState(items);
  useEffect(() => {
    if (watchSearch && items && watchSearch.trim() !== '') {
      const newFilteredItems = items.filter((item) => {
        let name = item.name;
        let parts = name.split(' ');
        if (item.number.toUpperCase().indexOf(watchSearch.trim().toUpperCase()) === 0) {
          return true;
        }
        for (let index = 0; index < parts.length; index++) {
          const element = parts[index];
          if (element.toUpperCase().indexOf(watchSearch.trim().toUpperCase()) === 0) {
            return true;
          }
        }
        return false;
      });
      setfilteredItems(newFilteredItems);
    } else {
      setfilteredItems(items);
    }
  }, [watchSearch, items]);
  return (
    <>
      <div className="search">
        <input type="text" {...register('search')} placeholder="Search..." />
      </div>
      <div className="contacts">
        {filteredItems &&
          filteredItems.map((el) => {
            return (
              <Contact key={el.id} id={el.id} name={el.name} number={el.number} desc={el.desc} />
            );
          })}
      </div>
    </>
  );
}
