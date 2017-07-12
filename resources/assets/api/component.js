import axios from 'axios';

const saveNewComponent = title => {
  return axios
    .post('/api/component', { title })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const saveComponent = (componentId, data, preview) => {
  return axios
    .post(`/api/component/${componentId}/version`, { data, preview })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const selectComponent = (componentId, isSelected) => {
  return axios
    .post(`/api/component/${componentId}/select`, { isSelected })
    .then(res => res.data)
    .catch(err => {
      throw err.response;
    });
};

const getComponents = () => {
  return axios.get('/api/component').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

const getElComponents = () => {
  return axios
    .get('/api/component/elementaire')
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

const getSelectedComponents = () => {
  return axios
    .get('/api/component/selected')
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

const getComponent = componentId => {
  return axios
    .get(`/api/component/${componentId}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err.response;
    });
};

export default {
  saveNewComponent,
  saveComponent,
  selectComponent,
  getComponents,
  getElComponents,
  getSelectedComponents,
  getComponent
};
