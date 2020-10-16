import { GET_DATETIMES, GET_SERVICE_TYPES, GET_LOCATIONS, SCHEDULE_APPOINTMENT, CANCEL_APPOINTMENT, GET_SERVICES } from '../actions/types.js';

const initialState = {
    service_datetimes: [],
    service_types: [],
    locations: [],
    comments: [],
    services: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATETIMES:
            return {
                ...state,
                service_datetimes: action.payload
            };
        case GET_SERVICE_TYPES:
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
                services: state.services.filter(datetime => datetime.id !== action.payload)
            };
        // Czy na pewno poprawne pola w returnie?
        case SCHEDULE_APPOINTMENT:
            return {
                ...state,
                service_datetimes: [...state.service_dates, action.payload],
                service_types: [...state.service_types, action.payload],
                locations: [...state.locations, action.payload],
                comments: [...state.comments, action.payload],
            };
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload
            };
        default:
            return state;
    };
};