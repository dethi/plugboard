import objectifApi from '../api/objectif';
import { localStorageAuthKey } from './../global';

const getObjectifs = objectifs => {
  return {
    type: 'GET_OBJECTIFS',
    objectifs
  };
};

const getObjectifsAsync = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi.getObjectifs().then(objectifs => {
        dispatch(getObjectifs(objectifs));
        resolve();
      });
    });
  };
};

const getScores = scores => {
  return {
    type: 'GET_SCORES',
    scores
  };
};

const getScoresAsync = () => {
  const value = localStorage.getItem(localStorageAuthKey);
  console.log('value', value);

  return dispatch => {
    return new Promise((resolve, reject) => {
      if (value) {
        objectifApi.getScores().then(scores => {
          dispatch(getScores(scores));
          resolve();
        });
      } else {
        dispatch(getScores([]));
        resolve();
      }
    });
  };
};

const setObjectifForModalInfo = objectif => {
  return {
    type: 'SET_OBJECTIF_FOR_MODAL_INFO',
    objectif
  };
};

const prepareStartObjectif = objectif => {
  return {
    type: 'PREPARE_START_OBJECTIF',
    objectif
  };
};

const showQuickView = showQuickView => {
  return {
    type: 'SHOW_QUICKVIEW',
    showQuickView
  };
};

const setObjectifAsCompleted = (scores, score) => {
  return {
    type: 'OBJECTIF_COMPLETED',
    scores,
    score
  };
};

const exitObjectifMode = () => {
  return {
    type: 'EXIT_OBJECTIF_MODE'
  };
};

const setObjectifAsCompletedAsync = (objectif, score) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi
        .setObjectifAsCompleted(objectif.id, score.total)
        .then(scores => {
          dispatch(setObjectifAsCompleted(scores, score));
          resolve();
        });
    }).catch(response => console.log(response));
  };
};

const prepareCheckObjectif = () => {
  return {
    type: 'PREPARE_CHECK_OBJECTIF'
  };
};

export default {
  getObjectifsAsync,
  getScoresAsync,
  prepareCheckObjectif,
  prepareStartObjectif,
  setObjectifAsCompleted,
  setObjectifAsCompletedAsync,
  showQuickView,
  exitObjectifMode,
  setObjectifForModalInfo
};
