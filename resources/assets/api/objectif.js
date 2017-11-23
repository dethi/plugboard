import axios from 'axios';

const getObjectifs = () => {
  return axios.get('/api/objectif').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const getScores = () => {
  return axios
    .get('/api/completedObjectif/scores')
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

const setObjectifAsCompleted = (objectifId, score) => {
  return axios
    .post('/api/completedObjectif', { objectifId, score })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

export default {
  getObjectifs,
  setObjectifAsCompleted,
  getScores
};
