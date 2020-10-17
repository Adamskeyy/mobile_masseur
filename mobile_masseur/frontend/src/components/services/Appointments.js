import React, { Fragment } from 'react';
import ServiceHistory from './ServiceHistory';
import ServiceList from './ServiceList';
import Wrapper from '../../hoc/Wrapper';

const Appointments = () => {
    // lokalny stan do trzymania sygnatury czasowej
    return (
        <Fragment>
            <ServiceList /> {/* Tablica z services w reduxie, sprawdzać długość i rerenderować komponent przy zmianie, dać jakiś klucz, który ma dostęp do długości tablicy */}
            <ServiceHistory />
        </Fragment>
    )
}

export default Wrapper(Appointments);