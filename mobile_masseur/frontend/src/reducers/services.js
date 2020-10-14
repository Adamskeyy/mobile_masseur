import { GET_DATETIMES, GET_SERVICES, GET_LOCATIONS, SCHEDULE_APPOINTMENT, CANCEL_APPOINTMENT } from '../actions/types.js';

const initialState = {
    service_datetimes: [],
    service_types: [],
    locations: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATETIMES:
            return {
                ...state,
                service_datetimes: action.payload
            };
        case GET_SERVICES:
            return {
                ...state,
                service_types: action.payload
        };
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            };
        case CANCEL_APPOINTMENT:
            return {
                ...state,
                service_datetimes: state.service_datetimes.filter(datetime => datetime.id !== action.payload)
            };
        case SCHEDULE_APPOINTMENT:
            return {
                ...state,
                service_dates: [...state.service_dates, action.payload]
            };
        default:
            return state;
    };
};