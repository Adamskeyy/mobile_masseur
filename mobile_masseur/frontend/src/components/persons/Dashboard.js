import React, { Fragment } from 'react';
import Form from './Form';
import Persons from './Persons';
import Wrapper from '../../hoc/Wrapper';

const Dashboard = () => {
    return (
        <Fragment>
            <Form />
            <Persons />
        </Fragment>
    )
}

export default Wrapper(Dashboard);