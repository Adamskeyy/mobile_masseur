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
        this.props.getServices();
    }

    render() {
        return (
            <Fragment>
                <h2>Historia usług</h2>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Lp</th>
                                <th>Nazwa usługi</th>
                                <th>Termin</th>
                                <th>Lokalizacja</th>
                                <th>Adres</th>
                                <th>Dodatkowe uwagi</th>
                                <th>Całkowity koszt</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.services.map((service, index) => (
                                <tr key={service.id}>
                                    <td>{index + 1}</td>
                                    <td>{service.massage_type}</td>
                                    <td>{service.massage_date_time}</td>
                                    <td>{service.massage_delivery}</td>
                                    <td>{service.address}</td>
                                    <td>{service.comment}</td>
                                    <td>milion</td>
                                    <td><button onClick={this.props.cancelAppointment.bind(this, service.id)} className="btn btn-danger btn-sm">Odwołaj</button></td>
                                </tr>
                            ))}
                        </tbody>
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
