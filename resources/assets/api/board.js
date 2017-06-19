import axios from 'axios';

const saveNewBoard = title => {
  return axios
    .post('/api/board', { title })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const saveBoard = (boardId, data) => {
  return axios
    .post(`/api/board/${boardId}/version`, { data })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const getBoards = () => {
  return axios.get('/api/board').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const getBoard = boardId => {
  return axios.get(`/api/board/${boardId}`).then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

export default {
  saveNewBoard,
  saveBoard,
  getBoards,
  getBoard
};
