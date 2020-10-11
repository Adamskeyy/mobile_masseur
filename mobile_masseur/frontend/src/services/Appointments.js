import React, { Fragment } from 'react';
import ServiceHistory from './ServiceHistory';
import ServiceList from './ServiceList';
import Wrapper from '../hoc/Wrapper';

const Appointments = () => {
    return (
        <Fragment>
            <ServiceList />
            <ServiceHistory />
        </Fragment>
    )
}

export default Wrapper(Appointments);