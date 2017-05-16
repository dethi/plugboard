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
  login,
  logout
};
