const palette = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_BLUEPRINTS':
      return {
        ...state,
        blueprints: action.blueprints
      };
    case 'SELECT_BLUEPRINT':
      return {
        ...state,
        selectedBlueprint: action.blueprint
      };
    case 'UNSELECT_BLUEPRINT':
      return {
        ...state,
        selectedBlueprint: null
      };
    default:
      return state;
  }
};

export default palette;
