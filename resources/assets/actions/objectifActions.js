import objectifApi from '../api/objectif';

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

const setObjectifAsCompleted = () => {
  return {
    type: 'OBJECTIF_COMPLETED'
  };
};

const setObjectifAsCompletedAsync = objectif => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi.setObjectifAsCompleted(objectif.id).then(() => {
        dispatch(setObjectifAsCompleted());
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

export default {
  getObjectifsAsync,
  setCurrentObjectif,
  prepareCheckObjectif,
  prepareLoadIOs,
  setObjectifAsCompleted,
  setObjectifAsCompletedAsync
};
