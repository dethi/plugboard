import objectifApi from '../api/objectif';

const getObjectifs = objectifs => {

        console.log('logg', objectifs);
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
  getObjectifsAsync
};
