import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_PERSONS, DELETE_PERSON, ADD_PERSON } from './types';

// GET PERSONS
export const getPersons = () => dispatch => {
    axios.get('/api/persons/')
        .then(res => {
            dispatch({
                type: GET_PERSONS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PERSON
export const deletePerson = (id) => dispatch => {
    axios.delete(`/api/persons/${id}/`)
        .then(res => {
            dispatch(createMessage({ deletePerson: 'Person Deleted' }));
            dispatch({
                type: DELETE_PERSON,
                payload: id
            });
        })
        .catch(err => console.log(err));
}

// ADD PERSON
export const addPerson = (person) => dispatch => {
    axios.post('/api/persons/', person)
        .then(res => {
            dispatch(createMessage({ addPerson: 'Person Added' }));
            dispatch({
                type: ADD_PERSON,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};