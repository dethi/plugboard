import { ElementSpec } from '../libs/board/model/elementSpec';
import ImageElComponentProvider from '../libs/utils/imageElComponentProvider';

const genBlueprintsFromElementaire = data => {
  const blueprints = [];

  data.forEach(el => {
    let curChar = 'A';
    const input = [];
    for (let i = 0; i < el.nbInput; i++) {
      input.push(curChar);
      curChar = String.fromCharCode(curChar.charCodeAt(0) + 1);
    }
    const output = [];
    for (let i = 0; i < el.nbOutput; i++) {
      output.push(curChar);
      curChar = String.fromCharCode(curChar.charCodeAt(0) + 1);
    }

    blueprints.push(
      new ElementSpec(
        el.title,
        el.spec_name,
        input,
        output,
        el.color,
        '#90F595',
        JSON.parse(el.truth_table),
        el.dimX,
        el.dimY,
        ImageElComponentProvider.getElementImage(el.title)
      )
    );
  });
  return blueprints;
};

const genBlueprints = data => {
  console.log(data);

  const blueprints = [];

  data.forEach(el => {
    const versionData = el.versions[0].data;

    blueprints.push(
      new ElementSpec(
        el.title,
        el.spec_name,
        versionData.input,
        versionData.output,
        versionData.color,
        '#90F595',
        versionData.truthTable,
        versionData.dimX,
        versionData.dimY,
        el.preview_url
      )
    );
  });
  return blueprints;
};

const removeBlueprints = (blueprints, removeBlueprints) => {
  removeBlueprints.forEach(el => {
    blueprints.splice(blueprints.indexOf(el), 1);
  });

  return blueprints;
};

const palette = (state = {}, action) => {
  const blueprints = state.blueprints || [];

  switch (action.type) {
    case 'SET_BLUEPRINTS':
      const newBlueprints = [];
      newBlueprints.push(...genBlueprints(action.blueprints));
      newBlueprints.push(...genBlueprintsFromElementaire(action.elBlueprints));
      return {
        ...state,
        blueprints: newBlueprints
      };
    case 'ADD_BLUEPRINTS':
      blueprints.push(...genBlueprints(action.blueprints));
      return {
        ...state,
        blueprints
      };
    case 'ADD_ELEMENTAIRE_BLUEPRINTS':
      blueprints.push(...genBlueprintsFromElementaire(action.blueprints));
      return {
        ...state,
        blueprints
      };
    case 'REMOVE_BLUEPRINTS':
      return {
        ...state,
        blueprints: removeBlueprints(blueprints, action.blueprints)
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
