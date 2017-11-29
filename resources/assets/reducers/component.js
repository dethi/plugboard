const component = (state = {}, action) => {
  switch (action.type) {
    case 'GET_COMPONENTS':
      return {
        ...state,
        components: action.components
      };
    default:
      return state;
  }
};

export default component;
