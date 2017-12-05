import componentApi from '../api/component';

import PaletteAction from '../actions/paletteActions';

const getComponents = components => {
  return {
    type: 'GET_COMPONENTS',
    components
  };
};

const getComponentsAsync = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      componentApi.getComponents().then(components => {
        dispatch(getComponents(components));
        resolve();
      });
    });
  };
};

const getSharedComponents = components => {
  return {
    type: 'GET_SHARED_COMPONENTS',
    components
  };
};

const getSharedComponentsAsync = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      componentApi.getSharedComponents().then(components => {
        dispatch(getSharedComponents(components));
        resolve();
      });
    });
  };
};

const selectComponent = (componentId, componentIsInPalette) => {
  return dispatch => {
    componentApi
      .selectComponent(componentId, !componentIsInPalette)
      .then(data => {
        if (componentIsInPalette) {
          dispatch(PaletteAction.removeBlueprints([data]));
        } else {
          dispatch(PaletteAction.addBlueprints([data]));
        }
      });
  };
};

export default {
  getComponentsAsync,
  getSharedComponentsAsync,
  selectComponent
};
