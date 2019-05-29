import LocalService from '../services/localservice';
import { setAlert } from './alert';
import { 
  GET_FILMS, 
  GET_FILM, 
  ADD_FILM, 
  DELETE_FILM,
  GET_ENUM,
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
    let result = await service.delFilm(uid);
    dispatch({ 
      type: DELETE_FILM,
      payload: uid
    });
    setAlert(result.msg, 'success', 3000)(dispatch)
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
    err.errors.forEach(function(item){
      setAlert(item.msg, 'warning', 2000)(dispatch);
    });
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

export const sendDataFile = (file, history) => async dispatch => {
  try {
    const service = new LocalService();
    const newData = await service.sendFile(file);
    if(newData.errors) {
      throw newData.errors
    } 
    setAlert(newData.msg, 'success', 3000)(dispatch);
    history.push('/menu');
    return true;
  } catch (err) {
    setAlert(err, 'warning', 3000)(dispatch);
    return false;
  }
}