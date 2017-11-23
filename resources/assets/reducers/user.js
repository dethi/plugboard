import { LocalStorageKey } from './../global';

const user = (state = null, action) => {
  switch (action.type) {
    case 'INIT_AUTH':
      const value = localStorage.getItem(LocalStorageKey.AUTH);
      try {
        return JSON.parse(value);
      } catch (SyntaxError) {
        // We cannot recover the Authenticated User, so we remove it.
        localStorage.removeItem(LocalStorageKey.AUTH);
        return null;
      }
    case 'LOGIN':
      localStorage.setItem(LocalStorageKey.AUTH, JSON.stringify(action.user));
      return action.user;
    case 'LOGOUT':
      localStorage.removeItem(LocalStorageKey.AUTH);
      return null;
    default:
      return state;
  }
};

export default user;
