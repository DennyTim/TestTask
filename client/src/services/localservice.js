export default class LocalService {

  _apiBase = '/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    const body = await res.json();
    return body;
  }

  getAllFilms() {
    return this.getResource('/films');
  }

  getOneFilm(id) {
    return this.getResource(`/films/${id}`);
  }
}


