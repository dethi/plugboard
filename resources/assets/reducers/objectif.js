import { LocalStorageKey } from './../global';

const objectif = (state = {}, action) => {
  switch (action.type) {
    case 'GET_OBJECTIFS':
      return {
        ...state,
        objectifs: action.objectifs
      };
    case 'GET_SCORES':
      return {
        ...state,
        scores: action.scores
      };
    case 'SET_SCORE':
      return {
        ...state,
        score: action.score,
        scores: action.scores
      };
    case 'SET_SCORES':
      return {
        ...state,
        scores: action.scores
      };
    case 'EMPTY_SCORES':
      localStorage.removeItem(LocalStorageKey.SCORE);
      return {
        ...state,
        scores: []
      };
    case 'EXIT_OBJECTIF_MODE':
      return {
        ...state,
        inObjectifMode: false,
        objectifForModalInfoStart: null,
        currentObjectif: null
      };
    case 'SET_OBJECTIF_FOR_MODAL_INFO':
      return {
        ...state,
        objectifForModalInfoStart: {
          ...action.objectif,
          truth_table: JSON.parse(action.objectif.truth_table)
        }
      };
    case 'PREPARE_CHECK_OBJECTIF':
      if (!state.prepareCheckObjectif) state.prepareCheckObjectif = 0;
      return {
        ...state,
        prepareCheckObjectif: state.prepareCheckObjectif + 1
      };
    case 'PREPARE_START_OBJECTIF':
      if (!state.prepareStartObjectif) state.prepareStartObjectif = 0;
      return {
        ...state,
        startTime: Date.now(),
        currentObjectif: action.objectif,
        inObjectifMode: true,
        prepareStartObjectif: state.prepareStartObjectif + 1
      };
    case 'SHOW_QUICKVIEW':
      return {
        ...state,
        showQuickView: action.showQuickView
      };

    default:
      return state;
  }
};

export default objectif;
