import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Contacts from '../../Components/Contacts/Contacts';
import { addContact } from '../../redux/reducers';
import './ProfilePage.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuth, contacts } = useSelector((state) => {
    return {
      isAuth: state.auth.isAuth,
      contacts: state.user?.contacts,
    };
  });

  const onAdd = () => {
    dispatch(addContact());
  };
  return (
    <>
      {(!isAuth && <Redirect to="/takeoff-staff-test/login" />) || (
        <div className="profilePage">
          <div className="profilePage__header">
            <div className="title">Contacts</div>
            <button className="button" onClick={onAdd}>
              Add
            </button>
          </div>
          <Contacts items={contacts} />
        </div>
      )}
    </>
  );
};

export default Profile;
