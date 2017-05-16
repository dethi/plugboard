const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('plugboardToken', action.user.token);
      return action.user;
    case 'LOGOUT':
      localStorage.removeItem('plugboardToken');
      return null;
    default:
      return state;
  }
};

export default user;
