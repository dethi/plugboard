const addBlueprints = blueprints => {
  return {
    type: 'ADD_BLUEPRINTS',
    blueprints
  };
};

const addElementaireBlueprints = blueprints => {
  return {
    type: 'ADD_ELEMENTAIRE_BLUEPRINTS',
    blueprints
  };
};

const removeBlueprints = blueprints => {
  return {
    type: 'REMOVE_BLUEPRINTS',
    blueprints
  };
};

const selectBlueprint = blueprint => {
  return {
    type: 'SELECT_BLUEPRINT',
    blueprint
  };
};

const unselecteBlueprint = () => {
  return {
    type: 'UNSELECT_BLUEPRINT'
  };
};

export default {
  addBlueprints,
  addElementaireBlueprints,
  removeBlueprints,
  selectBlueprint,
  unselecteBlueprint
};
