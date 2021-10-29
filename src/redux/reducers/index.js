import { MD5 } from 'crypto-js';
import { API } from '../../API';

const SET_DEFAULT_VALUE = 'SET_DEFAULT_VALUE';
const SET_AUTH = 'SET_AUTH';
const SET_NOTIFICATION = 'SET_NOTIFICATION';
const SET_FORM = 'SET_FORM';
const SET_USER = 'SET_USER';

const initialState = {
  auth: {
    isAuth: false,
    login: null,
    password: null,
  },
  user: {},
  pages: [
    { value: 'Log In', href: '/takeoff-staff-test/login', auth: false },
    { value: 'Sign Up', href: '/takeoff-staff-test/signup', auth: false },
    { value: 'Log Out', href: '/takeoff-staff-test/logout', auth: true },
  ],
  notification: null,
  forms: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DEFAULT_VALUE:
      let result = [...state.forms[payload.name].inputs];
      result = result.map((el) => {
        return { ...el, defaultValue: payload.values[el.name] };
      });
      return {
        ...state,
        forms: { ...state.forms, [payload.name]: { ...state.forms[payload.name], inputs: result } },
      };
    case SET_AUTH: {
      return {
        ...state,
        auth: {
          ...payload,
        },
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...state,
        notification: { ...payload },
      };
    }
    case SET_FORM: {
      return {
        ...state,
        forms: { ...state.forms, [payload.name]: payload.form },
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: { ...state.user, contacts: payload },
      };
    }
    default:
      return state;
  }
}

export const setDefaultValueAC = (name, values) => {
  return { type: SET_DEFAULT_VALUE, payload: { name, values } };
};
export const setAuth = (isAuth, id, login = null, password = null) => {
  return { type: SET_AUTH, payload: { id, login, password, isAuth } };
};
export const setUser = (contacts) => {
  return { type: SET_USER, payload: contacts.sort((a, b) => b.id - a.id) };
};
export const setNotification = (notification) => {
  return { type: SET_NOTIFICATION, payload: notification };
};
export const setWrongAC = () => {
  return { type: SET_NOTIFICATION, payload: { message: 'Something went wrong', isError: true } };
};
export const setForm = (name, form) => {
  return { type: SET_FORM, payload: { name, form } };
};

export const getForm = (name) => {
  return (dispatch) => {
    API.form(name).then((result) => {
      dispatch(setForm(name, result.data[0]));
    });
  };
};

export const signUp = (login, password) => {
  return (dispatch) => {
    const hash = MD5(password).toString();
    const contacts = [
      {
        id: 1,
        name: 'Your test contact',
        number: '70000000000',
        desc: 'Try edit or delete this contact',
      },
    ];
    API.signup(login, hash, contacts)
      .then((result) => {
        if (result.status >= 200 && result.status <= 300) {
          dispatch(setAuth(true, result.data.id, result.data.login, result.data.password));
          dispatch(setUser(result.data.contacts));
        } else {
          dispatch(setWrong());
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const login = (login, password) => {
  return (dispatch) => {
    API.login(login, password)
      .then((result) => {
        if (result.status >= 200 && result.status <= 300) {
          if (result.data.length && result.data[0].password === MD5(password).toString()) {
            dispatch(setAuth(true, result.data[0].id, login, password));
            dispatch(setUser(result.data[0].contacts));
          } else {
            dispatch(addNotification('Uncorrect login or password', true));
          }
        } else {
          dispatch(setWrong());
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const editContact = (contactId, { name, number, desc }) => {
  return (dispatch, getState) => {
    let { user, auth } = getState();
    let contacts = user.contacts.filter((el) => el.id !== contactId);
    const result = { contacts: [...contacts, { id: contactId, name, number, desc }] };
    API.edit(auth.id, result)
      .then((result) => {
        if (result.status >= 200 && result.status <= 300) {
          dispatch(setUser(result.data.contacts));
        } else {
          dispatch(setWrong());
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const deleteContact = (contactId) => {
  return (dispatch, getState) => {
    let { user, auth } = getState();
    const contacts = user.contacts.filter((el) => el.id !== contactId);
    API.delete(auth.id, contacts)
      .then((result) => {
        if (result.status >= 200 && result.status <= 300) {
          dispatch(setUser(result.data.contacts));
        } else {
          dispatch(setWrong());
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const addContact = () => {
  return (dispatch, getState) => {
    let { user, auth } = getState();
    const newId =
      (user.contacts.length === 0 && 1) || [...user.contacts].sort((a, b) => b.id - a.id)[0].id + 1;
    const contacts = [...user.contacts, { id: newId, name: '', number: '', desc: '' }];
    API.add(auth.id, contacts)
      .then((result) => {
        if (result.status >= 200 && result.status <= 300) {
          dispatch(setUser(result.data.contacts));
        } else {
          dispatch(setWrong());
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const setDefaultValue = (name, values) => {
  return (dispatch) => {
    if (Object.keys(values).length === 0) {
      return false;
    }
    dispatch(setDefaultValueAC(name, values));
  };
};

export const addNotification = (message, isError) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);
  };
};

export const setWrong = () => {
  return (dispatch) => {
    dispatch(setWrongAC());
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);
  };
};
