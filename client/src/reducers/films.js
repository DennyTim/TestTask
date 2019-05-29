import { 
  GET_FILMS, 
  GET_FILM,
  GET_ENUM,
  ADD_FILM, 
  DELETE_FILM
} from '../actions/types';

const initialState = {
  films: [],
  film: {},
  list: [],
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
    default:
      return state;
  }
}