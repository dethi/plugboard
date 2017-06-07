const addBlueprints = blueprints => {
  return {
    type: 'ADD_BLUEPRINTS',
    blueprints: blueprints
  };
};

const selectBlueprint = blueprint => {
  return {
    type: 'SELECT_BLUEPRINT',
    blueprint: blueprint
  };
};

const unselecteBlueprint = () => {
  return {
    type: 'UNSELECT_BLUEPRINT'
  };
};

export default {
  addBlueprints,
  selectBlueprint,
  unselecteBlueprint
};
