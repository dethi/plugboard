import objectifApi from '../api/objectif';
import { LocalStorageKey } from './../global';

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

const emptyScores = () => {
  return {
    type: 'EMPTY_SCORES'
  };
};

const getScoresAsync = () => {
  const user = localStorage.getItem(LocalStorageKey.AUTH);
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (user) {
        objectifApi.getScores().then(scores => {
          dispatch(getScores(scores));
          resolve();
        });
      } else {
        const scores = localStorage.getItem(LocalStorageKey.SCORE);
        try {
          dispatch(getScores(scores ? JSON.parse(scores) : []));
          resolve();
        } catch (SyntaxError) {
          // We cannot recover the scores, so we remove it.
          localStorage.removeItem(LocalStorageKey.SCORE);
          dispatch(getScores(JSON.parse([])));
          resolve();
        }
      }
    }).catch(response => console.log(response));
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

const setScore = (scores, score) => {
  return {
    type: 'SET_SCORE',
    scores,
    score
  };
};

const exitObjectifMode = () => {
  return {
    type: 'EXIT_OBJECTIF_MODE'
  };
};

const setScoreAsync = (objectif, score) => {
  const user = localStorage.getItem(LocalStorageKey.AUTH);
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (user) {
        objectifApi.setScore(objectif.id, score.total).then(scores => {
          dispatch(setScore(scores, score));
          resolve();
        });
      } else {
        let value = localStorage.getItem(LocalStorageKey.SCORE);
        try {
          const scores = value ? JSON.parse(value) : [];
          const currentScoreIndex = scores.findIndex(
            e => e.objectif_id === objectif.id
          );
          if (currentScoreIndex !== -1) {
            if (score.total > scores[currentScoreIndex].score) {
              scores[currentScoreIndex].score = score.total;
            }
          } else {
            scores.push({
              objectif_id: objectif.id,
              score: score.total
            });
          }
          localStorage.setItem(LocalStorageKey.SCORE, JSON.stringify(scores));
          dispatch(setScore(scores, score));
          resolve();
        } catch (SyntaxError) {
          // We cannot recover the scores, so we remove it.
          localStorage.removeItem(LocalStorageKey.SCORE);
          dispatch(setScore([], score));
          resolve();
        }
      }
    }).catch(response => console.log(response));
  };
};

const setScores = scores => {
  return {
    type: 'SET_SCORES',
    scores
  };
};

const setScoresAsync = scores => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      objectifApi.setScores(scores).then(scores => {
        dispatch(setScores(scores));
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
  setScoreAsync,
  showQuickView,
  exitObjectifMode,
  setObjectifForModalInfo,
  setScoresAsync,
  emptyScores
};
