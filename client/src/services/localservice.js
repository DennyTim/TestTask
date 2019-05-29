import fetch from 'node-fetch';
import Bluebird from 'bluebird';
fetch.Promise = Bluebird;

export default class LocalService {

  _apiBase = '/api';

  async getResource(url, options) {
    try {
      let res = await fetch(`${this._apiBase}${url}`, options);
      if (res.status !== 200) {
        return {
          status: res.status,
          errors: await res.json()
        }
      }
      const body = await res.json();
      return body;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllFilms() {
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


