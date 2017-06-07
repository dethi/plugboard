import axios from 'axios';

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(res => res.data)
    .catch(err => console.error(err));
};

export default {
  login
};
