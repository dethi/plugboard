import axios from 'axios';

const getObjectifs = () => {
  return axios.get('/api/objectif').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const getScores = () => {
  return axios.get('/api/score/scores').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const setScore = (objectifId, score) => {
  return axios
    .post('/api/score', { objectifId, score })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

const setScores = scores => {
  return axios
    .post('/api/score/scores', { scores })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

export default {
  getObjectifs,
  setScore,
  getScores,
  setScores
};
