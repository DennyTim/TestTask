import { GET_FILMS, GET_FILM } from '../actions/types';

const initialState = {
  films: [],
  film: {},
  loading: true
}

export default function(state = initialState, action) {

  const {type, payload} = action;

  switch(type) {

    case GET_FILMS: 
      return {
        ...state,
        films: payload,
        loading: false
      };

    case GET_FILM: 
      return {
        ...state,
        film: payload,
        loading: false
      };

    default:
      return state;
  }
}