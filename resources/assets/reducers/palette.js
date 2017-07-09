import { ElementSpec } from '../libs/board/model/elementSpec';
import ImageElComponentProvider from '../libs/utils/imageElComponentProvider';

const genBlueprintsFromEl = data => {
  const blueprints = [];

  data.forEach(el => {
    console.log(el);

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

  console.log(blueprints);
  return blueprints;
};

const palette = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_BLUEPRINTS':
      return {
        ...state,
        blueprints: action.blueprints
      };
    case 'ADD_ELEMENTAIRE_BLUEPRINTS':
      return {
        ...state,
        blueprints: genBlueprintsFromEl(action.blueprints)
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
