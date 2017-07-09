const modal = (state = {}, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case 'DISPLAY_MODAL':
      newState[action.name] = true;
      return newState;
    case 'HIDE_MODAL':
      delete newState[action.name];
      return newState;
    case 'DISPLAY_ERROR_MODAL':
      newState['ERROR'] = true;
      newState['ERROR_MSG'] = action.error;
      return newState;
    default:
      return state;
  }
};

export default modal;
