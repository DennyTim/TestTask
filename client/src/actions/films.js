import LocalService from '../services/localservice';
import { GET_FILMS } from './types';

export const getFilms = () => async dispatch => {
  try {
    const service = new LocalService();
    const data = await service.getAllFilms();
    dispatch({
      type: GET_FILMS,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
}