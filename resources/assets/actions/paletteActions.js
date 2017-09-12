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

const setBlueprints = (elBlueprints, blueprints) => {
  return {
    type: 'SET_BLUEPRINTS',
    elBlueprints,
    blueprints
  };
};

const initPalette = isLogged => {
  return dispatch => {
    componentApi
      .getElComponents()
      .then(elBlueprints => {
        if (isLogged)
          componentApi
          .getSelectedComponents()
          .then(blueprints => dispatch(setBlueprints(elBlueprints, blueprints)));
        else
          dispatch(setBlueprints(elBlueprints, []));
      });
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
  initPalette,
  addBlueprints,
  removeBlueprints,
  selectBlueprint,
  unselecteBlueprint
};
