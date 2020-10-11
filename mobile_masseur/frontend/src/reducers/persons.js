import { GET_PERSONS, DELETE_PERSON, ADD_PERSON, LOGOUT_SUCCESS } from '../actions/types.js';

const initialState = {
    persons: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PERSONS:
            return {
                ...state,
                persons: action.payload
            };
        case DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.payload)
            };
        case ADD_PERSON:
            return {
                ...state,
                persons: [...state.persons, action.payload]
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                persons: []
            };
        default:
            return state;
    }
}   