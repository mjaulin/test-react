import { combineReducers } from 'redux';

import todos from './todo';
import errors from './error';

export default combineReducers({
    todos,
    errors
});