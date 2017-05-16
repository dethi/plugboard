export const login = user => {
  return {
    type: 'LOGIN',
    user: user
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};
