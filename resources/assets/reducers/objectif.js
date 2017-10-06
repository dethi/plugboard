const objectif = (state = {}, action) => {
  switch (action.type) {
    case 'GET_OBJECTIFS':
      return {
        ...state,
        objectifs: action.objectifs
      };
    case 'SET_CURRENT_OBJECTIF':
      return {
        ...state,
        objectifIsLoaded: false,
        currentObjectif: action.currentObjectif
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
    default:
      return state;
  }
};

export default objectif;
