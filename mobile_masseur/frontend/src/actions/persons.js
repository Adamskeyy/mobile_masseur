import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PERSONS, DELETE_PERSON, ADD_PERSON } from './types';

// GET PERSONS
export const getPersons = () => (dispatch, getState) => {
    axios.get('/api/persons/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PERSONS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PERSON
export const deletePerson = (id) => (dispatch, getState) => {
    axios.delete(`/api/persons/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deletePerson: 'Usługa odwołana' }));
            dispatch({
                type: DELETE_PERSON,
                payload: id
            });
        })
        .catch(err => console.log(err));
}

// ADD PERSON
export const addPerson = (person) => (dispatch, getState) => {
    axios.post('/api/persons/', person, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addPerson: 'Usługa dodana' }));
            dispatch({
                type: ADD_PERSON,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};