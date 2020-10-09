import React, { Fragment } from 'react';
import Form from './Form';
import Persons from './Persons';

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Persons />
        </Fragment>
    )
}
