import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_SERVICES, CANCEL_APPOINTMENT, CHOOSE_APPOINTMENT } from './types';

// GET SERVICES
export const getServices = () => (dispatch, getState) => {
    axios.get('/api/persons/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERVICES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// CANCEL APPOINTMENT
export const cancelAppointment = (id) => (dispatch, getState) => {
    axios.update(`/api/persons/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ cancelAppointment: 'Usługa odwołana' }));
            dispatch({
                type: CANCEL_APPOINTMENT,
                payload: id
            });
        })
        .catch(err => console.log(err));
}

// CHOOSE APOINTMENT
export const chooseAppointment = (person) => (dispatch, getState) => {
    axios.post('/api//', person, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ chooseAppointment: 'Usługa wybrana' }));
            dispatch({
                type: CHOOSE_APPOINTMENT,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};