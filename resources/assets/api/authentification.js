import axios from 'axios';

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
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
      throw err.response;
    });
};

const update = (
  name,
  old_password,
  new_password,
  new_password_confirmation
) => {
  return axios
    .post('/api/auth/update', {
      name,
      old_password,
      new_password,
      new_password_confirmation
    })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

module.exports = {
  login,
  register,
  update
};
