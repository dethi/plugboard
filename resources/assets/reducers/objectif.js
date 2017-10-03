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
        currentObjectif: action.currentObjectif
      };
    default:
      return state;
  }
};

export default objectif;
