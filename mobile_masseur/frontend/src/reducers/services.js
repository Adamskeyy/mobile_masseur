// import { GET_SERVICE_DATES, CANCEL_SUCCESS, APPOINTMENT_SUCCESS } from '../actions/types.js';

// const initialState = {
//     persons: []
// }

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case GET_SERVICE_DATES:
//             return {
//                 ...state,
//                 service_dates: action.payload
//             };
//         case DELETE_PERSON:
//             return {
//                 ...state,
//                 service_dates: state.service_dates.filter(person => person.id !== action.payload)
//             };
//         case ADD_PERSON:
//             return {
//                 ...state,
//                 service_dates: [...state.service_dates, action.payload]
//             };
//         case LOGOUT_SUCCESS:
//             return {
//                 ...state,
//                 service_dates: []
//             };
//         default:
//             return state;
//     }
// }   