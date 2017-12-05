const component = (state = {}, action) => {
  switch (action.type) {
    case 'GET_COMPONENTS':
      return {
        ...state,
        components: action.components
      };
    case 'GET_SHARED_COMPONENTS':
      return {
        ...state,
        shared: action.components
      };
    default:
      return state;
  }
};

export default component;
