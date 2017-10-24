const getMaxCompletedObjectif = objectifs => {
  const maxCompletedObjectif = objectifs.reduce(function(prev, curr) {
    return curr.id > prev.id && curr.score != null ? curr : prev;
  });
  return maxCompletedObjectif && maxCompletedObjectif.score !== null
    ? maxCompletedObjectif.id
    : 0;
};

const objectif = (state = {}, action) => {
  switch (action.type) {
    case 'GET_OBJECTIFS':
      return {
        ...state,
        objectifs: action.objectifs,
        maxCompletedObjectifId: getMaxCompletedObjectif(action.objectifs)
      };
    case 'OBJECTIF_COMPLETED':
      return {
        ...state,
        objectifs: action.objectifs,
        score: action.score,
        maxCompletedObjectifId: getMaxCompletedObjectif(action.objectifs)
      };
    case 'EXIT_OBJECTIF_MODE':
      return {
        ...state,
        inObjectifMode: false
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
