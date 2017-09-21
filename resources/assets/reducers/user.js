import { localStorageAuthKey } from './../global';

const user = (state = null, action) => {
  switch (action.type) {
    case 'INIT_AUTH':
      const value = localStorage.getItem(localStorageAuthKey);
      try {
        return JSON.parse(value);
      } catch (SyntaxError) {
        // We cannot recover the Authenticated User, so we remove it.
        localStorage.removeItem(localStorageAuthKey);
        return null;
      }
    case 'UPDATE':
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
