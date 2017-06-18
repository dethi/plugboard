import axios from 'axios';

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(res => res.data)
    .catch(err => console.error(err));
};

const register = (name, email, password, password_confirmation) => {
  return axios
    .post('/api/auth/register', {
      name,
      email,
      password,
      password_confirmation
    })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};

module.exports = {
  login,
  register
};
