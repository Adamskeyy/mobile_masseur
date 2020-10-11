import { combineReducers } from 'redux';
import persons from './persons';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
    persons,
    errors,
    messages,
    auth
});