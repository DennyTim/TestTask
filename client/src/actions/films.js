import LocalService from '../services/localservice';
import { GET_FILMS, GET_FILM, DELETE_FILM } from './types';

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

export const deleteFilm = (id, history) => async dispatch => {
  try {
    const service = new LocalService();
    await service.delFilm(id);
    dispatch({ 
      type: DELETE_FILM,
      payload: id
    });
    history.push('/menu');
  } catch (err) {
    console.log(err);
  }
}