import { 
  GET_FILMS, 
  GET_FILM,
  GET_ENUM,
  ADD_FILM, 
  DELETE_FILM,
  ADD_FILE } from '../actions/types';

const initialState = {
  films: [],
  film: {},
  list: [],
  file: {},
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
    
    case DELETE_FILM:
      return {
        film: {},
        films: state.films.filter(item => item.id !== payload),
        loading: false
      };

    case ADD_FILM:
      return {
        ...state,
        films: [...state.films, payload],
        loading: false
      };
    case GET_ENUM:
      return {
        ...state,
        loading: false,
        list: payload
      }
    
    case ADD_FILE:
      return {
        ...state,
        loading: false,
        file: payload
      }

    default:
      return state;
  }
}