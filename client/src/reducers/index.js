import { combineReducers } from 'redux';
import alert from './alert';
import films from './films';

export default combineReducers({
    alert,
    films
});