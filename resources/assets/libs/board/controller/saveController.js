import axios from 'axios';

export class SaveController {
  async saveGrid(id, grid) {
    if (id === null) {
      const data = await axios
        .post('/api/boards', { title: 'plop' })
        .then(res => res.data);

      id = data.id;
    }

    return axios
      .post(`/api/boards/${id}/versions`, { data: grid })
      .then(res => res.data);
  }

  openGrid(id) {
    return axios.get(`/api/boards/${id}`).then(res => res.data);
  }

  listGrid() {
    return axios.get('/api/boards').then(res => res.data);
  }
}
