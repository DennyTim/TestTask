import { GET_FILMS } from '../actions/types';

const initialState = {
  films: []
}

export default function(state = initialState, action) {

  const {type, payload} = action;

  switch(type) {

    case GET_FILMS: 
      return {
        films: payload
      };

    default:
      return state;
  }
}