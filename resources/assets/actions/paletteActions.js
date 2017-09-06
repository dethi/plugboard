import componentApi from '../api/component';

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

const addAllBlueprintsAsync = () => {
  return dispatch => {
    componentApi
      .getElComponents()
      .then(data => dispatch(addElementaireBlueprints(data)));

    componentApi
      .getSelectedComponents()
      .then(data => dispatch(addBlueprints(data)));

    // Can return Promise for chain action :)
    // return Promise.resolve();
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
  addAllBlueprintsAsync,
  addBlueprints,
  addElementaireBlueprints,
  removeBlueprints,
  selectBlueprint,
  unselecteBlueprint
};
