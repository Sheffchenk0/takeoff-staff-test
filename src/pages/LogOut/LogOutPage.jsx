import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { addNotification, setAuth } from '../../redux/reducers';
const Logoutpage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(setAuth(false));
      dispatch(addNotification('Log out done', false));
    }
  }, [dispatch, isAuth]);
  return <Redirect to="/takeoff-staff-test/" />;
};

export default Logoutpage;
