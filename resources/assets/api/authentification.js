import axios from 'axios';

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const register = (
  name,
  email,
  password,
  password_confirmation,
  wants_autosav
) => {
  return axios
    .post('/api/auth/register', {
      name,
      email,
      password,
      password_confirmation,
      wants_autosav
    })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

module.exports = {
  login,
  register
};
