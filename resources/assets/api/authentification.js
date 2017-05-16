const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = {
      name: 'Arthur',
      id: 42,
      token: 'plugboard42token'
    };
    resolve(user);
  });
};

const loginFromToken = token => {
  return new Promise((resolve, reject) => {
    const user = {
      name: 'Arthur',
      id: 42,
      token: 'plugboard42token'
    };
    resolve(user);
  });
};

export default {
  login,
  loginFromToken
};
