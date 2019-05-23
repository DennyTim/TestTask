import LocalService from '../services/localservice';
import { 
  GET_FILMS, 
  GET_FILM, 
  ADD_FILM, 
  DELETE_FILM,
  GET_ENUM,
  ADD_FILE
} from './types';

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

export const addFilm = (data, history) => async dispatch => {
  try {
    const service = new LocalService();
    const newData = await service.addOne(data);
    dispatch({ 
      type: ADD_FILM,
      payload: newData
    });
    history.push('/menu');
  } catch (err) {
    console.log(err);
  }
}

export const getListFormat = () => async dispatch => {
  try {
    const service = new LocalService();
    const newData = await service.getEnum();
    dispatch({ 
      type: GET_ENUM,
      payload: newData
    });
  } catch (err) {
    console.log(err);
  }
}

export const sendDataFile = (file) => async dispatch => {
  try {
    const service = new LocalService();
    const newData = await service.sendFile(file);
    dispatch({ 
      type: ADD_FILE,
      payload: newData
    });
  } catch (err) {
    console.log(err);
  }
}