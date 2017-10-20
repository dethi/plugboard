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

const setCurrentObjectif = currentObjectif => {
  return {
    type: 'SET_CURRENT_OBJECTIF',
    currentObjectif
  };
};

const prepareLoadIOs = () => {
  return {
    type: 'PREPARE_LOAD_IOS'
  };
};

const showQuickView = showQuickView => {
  return {
    type: 'SHOW_QUICKVIEW',
    showQuickView
  };
};

// Not usefulll anymore
const setObjectifAsCompleted = objectif => {
  return {
    type: 'OBJECTIF_COMPLETED',
    objectif
  };
};
// Call the api directly from Board.js ?

const setObjectifAsCompletedAsync = (objectif, score) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi.setObjectifAsCompleted(objectif.id, score).then(objectifs => {
        dispatch(getObjectifs(objectifs));
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

const getMaxCompletedObjectif = maxCompletedObjectif => {
  return {
    type: 'GET_MAX_COMPLETED_OBJECTIF',
    maxCompletedObjectif
  };
};

const getMaxCompletedObjectifAsync = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi.getMaxCompletedObjectif().then(maxCompletedObjectif => {
        dispatch(getMaxCompletedObjectif(maxCompletedObjectif));
        resolve();
      });
    });
  };
};

export default {
  getObjectifsAsync,
  setCurrentObjectif,
  prepareCheckObjectif,
  prepareLoadIOs,
  setObjectifAsCompleted,
  setObjectifAsCompletedAsync,
  getMaxCompletedObjectifAsync,
  showQuickView
};
