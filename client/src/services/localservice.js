export default class LocalService {
  async getResource() {
    const res = await fetch(`/api/films`);
    const body = await res.json();
    return body;
  }

  getAllFilms() {
    return this.getResource();
  }
}


