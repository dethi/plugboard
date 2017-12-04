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

const update = user => {
  return {
    type: 'UPDATE',
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
  update,
  logout
};
