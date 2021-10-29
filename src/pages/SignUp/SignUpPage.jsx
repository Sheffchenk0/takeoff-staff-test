import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { getForm, setDefaultValue, signUp } from '../../redux/reducers';

const SignUpPage = () => {
  const { isAuth, form } = useSelector((state) => {
    return {
      isAuth: state.auth.isAuth,
      form: state.forms['signupPageForm'],
    };
  });
  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('signupPageForm', watchAllFields));
  };
  useEffect(() => {
    if (!form) {
      dispatch(getForm('signupPageForm'));
    }
  }, [form, dispatch]);
  if (isAuth) {
    return <Redirect to="/takeoff-staff-test/profile" />;
  }

  const onSubmit = ({ login, password }) => {
    dispatch(signUp(login, password, 'Sign Up succes', false));
  };
  return (
    <>
      <h2 className="title">Sign up</h2>
      <Form onSubmit={onSubmit} onUnmount={onUnmount} inputs={form?.inputs} />
    </>
  );
};

export default memo(SignUpPage);
