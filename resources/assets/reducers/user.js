import { localStorageAuthKey } from './../global';

const user = (state = null, action) => {
  switch (action.type) {
    case 'INIT_AUTH':
      return JSON.parse(localStorage.getItem(localStorageAuthKey));
    case 'LOGIN':
      localStorage.setItem(localStorageAuthKey, JSON.stringify(action.user));
      return action.user;
    case 'LOGOUT':
      localStorage.removeItem(localStorageAuthKey);
      return null;
    default:
      return state;
  }
};

export default user;
