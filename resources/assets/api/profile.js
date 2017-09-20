import axios from 'axios';

const update = (
  name,
  old_password,
  new_password,
  new_password_confirmation,
  wants_autosav
) => {
  return axios
    .post('/api/profile/update', {
      name,
      old_password,
      new_password,
      new_password_confirmation,
      wants_autosav
    })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

module.exports = {
  update
};
