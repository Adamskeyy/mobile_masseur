import axios from 'axios';
import { createMessage } from './messages';

import { GET_PERSONS, DELETE_PERSON, ADD_PERSON, GET_ERRORS } from './types';

// GET PERSONS
export const getPersons = () => dispatch => {
    axios.get('/api/persons/')
        .then(res => {
            dispatch({
                type: GET_PERSONS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
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
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        });
};