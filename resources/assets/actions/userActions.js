const init = () => {
  return {
    type: 'INIT_AUTH'
  };
};

const login = user => {
  return {
    type: 'LOGIN',
    user: user
  };
};

const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export default {
  init,
  login,
  logout
};
