const objectif = (state = {}, action) => {
  switch (action.type) {
    case 'GET_OBJECTIFS':
      return {
        ...state,
        objectifs: action.objectifs
      };
    // Not usefull anymore
    case 'OBJECTIF_COMPLETED':
      return {
        ...state,
        maxCompletedObjectif: action.maxCompletedObjectif
      };
    case 'SET_CURRENT_OBJECTIF':
      return {
        ...state,
        objectifIsLoaded: false,
        currentObjectif: action.currentObjectif
          ? {
              ...action.currentObjectif,
              truth_table: JSON.parse(action.currentObjectif.truth_table)
            }
          : null
      };
    case 'PREPARE_CHECK_OBJECTIF':
      if (!state.prepareCheckObjectif) state.prepareCheckObjectif = 0;
      return {
        ...state,
        prepareCheckObjectif: state.prepareCheckObjectif + 1
      };
    case 'PREPARE_LOAD_IOS':
      if (!state.prepareLoadIOs) state.prepareLoadIOs = 0;
      return {
        ...state,
        objectifIsLoaded: true,
        prepareLoadIOs: state.prepareLoadIOs + 1
      };
    case 'GET_MAX_COMPLETED_OBJECTIF':
      return {
        ...state,
        maxCompletedObjectif: action.maxCompletedObjectif
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
