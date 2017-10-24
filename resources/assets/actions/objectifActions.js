import objectifApi from '../api/objectif';

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

const setObjectifAsCompleted = (objectifs, score) => {
  return {
    type: 'OBJECTIF_COMPLETED',
    objectifs,
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
        .then(objectifs => {
          dispatch(setObjectifAsCompleted(objectifs, score));
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
  prepareCheckObjectif,
  prepareStartObjectif,
  setObjectifAsCompleted,
  setObjectifAsCompletedAsync,
  showQuickView,
  exitObjectifMode,
  setObjectifForModalInfo
};
