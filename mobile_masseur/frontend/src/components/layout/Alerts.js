import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';

class Alerts extends Component {
    componentDidMount() {
        this.props.alert.show('It Works');
    }

    render() {
        return <Fragment />;
    }
}

export default withAlert()(Alerts); 
