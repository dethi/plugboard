import axios from 'axios';

const getObjectifs = () => {
  return axios.get('/api/objectif').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

export default {
  getObjectifs
};
