import axios from 'axios';

const getObjectifs = () => {
  return axios.get('/api/objectif').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const getMaxCompletedObjectif = () => {
  return axios
    .get('/api/completedObjectif/maxCompletedObjectif')
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

const setObjectifAsCompleted = boardId => {
  console.log('here', boardId);
  return axios
    .post(`/api/completedObjectif/${boardId}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

export default {
  getObjectifs,
  setObjectifAsCompleted,
  getMaxCompletedObjectif
};
