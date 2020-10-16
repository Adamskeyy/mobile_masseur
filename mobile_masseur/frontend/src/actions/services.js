import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_DATETIMES, GET_SERVICE_TYPES, GET_LOCATIONS, SCHEDULE_APPOINTMENT, CANCEL_APPOINTMENT } from './types';

// GET DATETIMES
export const getDatetimes = () => (dispatch, getState) => {
    axios.get('/api/massage/datetime/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DATETIMES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET SERVICE_TYPES
export const getServiceTypes = () => (dispatch, getState) => {
    axios.get('/api/massage/type/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERVICE_TYPES,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET LOCATIONS
export const getLocations = () => (dispatch, getState) => {
    axios.get('/api/massage/delivery/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LOCATIONS,
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
export const chooseAppointment = (service) => (dispatch, getState) => {
    axios.post('/api/massage/service/', service, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ chooseAppointment: 'Usługa wybrana' }));
            dispatch({
                type: SCHEDULE_APPOINTMENT,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};