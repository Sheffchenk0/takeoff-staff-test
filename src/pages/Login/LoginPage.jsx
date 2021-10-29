import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { getForm, login, setDefaultValue } from '../../redux/reducers';

const Loginpage = () => {
  const { isAuth, form } = useSelector((state) => {
    return {
      isAuth: state?.auth?.isAuth,
      form: state.forms['loginPageForm'],
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!form) {
      dispatch(getForm('loginPageForm'));
    }
  }, [form, dispatch]);

  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('loginPageForm', watchAllFields));
  };
  const onSubmit = ({ login: loginText, password }) => {
    dispatch(login(loginText, password, 'Login succes', false));
  };
  return (
    <>
      {(isAuth && <Redirect to="/takeoff-staff-test/profile" />) || (
        <div>
          <div className="title">Log in</div>
          <Form onSubmit={onSubmit} onUnmount={onUnmount} inputs={form?.inputs} />
        </div>
      )}
    </>
  );
};

export default Loginpage;
