const contextMenu = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONTEXT_TYPE':
      return {
        ...state,
        typeMenu: action.typeMenu,
        loading: false
      };
    case 'PREPARE_CONTEXT_MENU':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default contextMenu;
