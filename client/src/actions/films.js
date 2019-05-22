import LocalService from '../services/localservice';
import { GET_FILMS, GET_FILM } from './types';

export const getFilms = () => async dispatch => {
  try {
    const service = new LocalService();
    const data = await service.getAllFilms();
    dispatch({
      type: GET_FILMS,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
}

export const getFilm = (id) => async dispatch => {
  try {
    const service = new LocalService();
    const data = await service.getOneFilm(id);
    dispatch({
      type: GET_FILM,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
}