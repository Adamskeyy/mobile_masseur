import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cancelAppointment, getServices } from '../../actions/services';

export class ServiceHistory extends Component {
    static propTypes = {
        services: PropTypes.array.isRequired,
        getServices: PropTypes.func.isRequired,
        cancelAppointment: PropTypes.func.isRequired
    };

    componentDidMount() {
        // this.props.getServices();
    }

    render() {
        return (
            <Fragment>
                <h2>Historia usług</h2>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nazwa usługi</th>
                                <th>Termin</th>
                                <th>Lokalizacja</th>
                                <th>Dodatkowe uwagi</th>
                                <th>Całkowity koszt</th>
                                <th></th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {this.props.services.map(service => (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.email}</td>
                                    <td>{service.message}</td>
                                    <td>{service.message}</td>
                                    <td><button onClick={this.props.cancelAppointment.bind(this, person.id)} className="btn btn-danger btn-sm">Odwołaj</button></td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    services: state.services.services,
});

export default connect(mapStateToProps, { getServices, cancelAppointment })(ServiceHistory);
