import { combineReducers } from 'redux';
import persons from './persons';
import errors from './errors';
import messages from './messages';
import services from './services';
import auth from './auth';

export default combineReducers({
    persons,
    errors,
    messages,
    services,
    auth
});