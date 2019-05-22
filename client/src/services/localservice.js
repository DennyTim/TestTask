export default class LocalService {

  _apiBase = '/api';

  async getResource(url, options) {
    const res = await fetch(`${this._apiBase}${url}`, options);
    const body = await res.json();
    return body;
  }

  getAllFilms() {
    const options = {
      method: "GET"
    };
    return this.getResource(`/films`, options);
  }

  getOneFilm(id) {
    const options = {
      method: "GET"
    };
    return this.getResource(`/films/${id}`, options);
  }

  delFilm(id) {
    const options = {
      method: "DELETE"
    };
    return this.getResource(`/films/${id}`, options);
  }
}


