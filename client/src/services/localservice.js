import fetch from 'node-fetch';
import Bluebird from 'bluebird';
fetch.Promise = Bluebird;

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

  addOne(data) {
    const options = {
      method: 'post',
      body:    JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }
    return this.getResource(`/films`, options);
  }

  getEnum() {
    const options = {
      method: "GET"
    };
    return this.getResource(`/enum`, options);
  }

  sendFile(file) {
    let formData = new FormData();
    formData.append('file', file)
    const options = {
      method: 'POST',
      body: formData
    };
    return this.getResource(`/import`, options);
  }
}


