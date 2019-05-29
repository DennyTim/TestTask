import LocalService from '../services/localservice';
import uuid from 'uuid';
import { 
  GET_FILMS, 
  GET_FILM, 
  ADD_FILM, 
  DELETE_FILM,
  GET_ENUM,
  ADD_FILE,
  SET_ALERT,
  REMOVE_ALERT
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

export const getFilm = (uid) => async dispatch => {
  try {
    const service = new LocalService();
    const data = await service.getOneFilm(uid);
    dispatch({
      type: GET_FILM,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
}

export const deleteFilm = (uid, history) => async dispatch => {
  try {
    const service = new LocalService();
    await service.delFilm(uid);
    dispatch({ 
      type: DELETE_FILM,
      payload: uid
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
    if(!newData.errors) {
      dispatch({ 
        type: ADD_FILM,
        payload: newData
      });
      history.push('/menu');
    } else {
      throw newData.errors
    }
  } catch (err) {
    const id = uuid.v4();           //модуль уникального идентификатора
    dispatch({
        type: SET_ALERT,
        payload: { msg: err, id}
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), 5000);
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