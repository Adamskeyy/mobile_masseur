import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDatetimes, getServices, getLocations, chooseAppointment } from '../../actions/services';

export class ServiceList extends Component {
    state = {
        message: ''
    };

    static propTypes = {
        chooseAppointment: PropTypes.func.isRequired,
        getDatetimes: PropTypes.func.isRequired,
        getServices: PropTypes.func.isRequired,
        getLocations: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getDatetimes();
        this.props.getServices();
        this.props.getLocations();
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { service_datetimes, service_types, locations } = this.props;
        const message = this.state;
        const service = { service_datetimes, service_types, locations, message };
        console.log(service);
        // this.props.chooseAppointment(service);
    };

    render() {
        let serviceTypeOptions;
        let dateTimeOptions;
        let locationOptaions;
        const { service_datetimes, service_types, locations } = this.props;

        service_types ? serviceTypeOptions = (this.props.service_types.map(type => (
            <option key={type.id}>{type.name}, {type.duration} min</option>
        ))) : serviceTypeOptions = (
            <option>Brak dostępnych usług</option>
        );

        service_datetimes ? dateTimeOptions = (this.props.service_datetimes.map(dateTime => (
            <option key={dateTime.id}>{dateTime.date_time}</option>
        ))) : dateTimeOptions = (
            <option>Brak dostępnych terminów</option>
        );
        
        locations ? locationOptaions = (this.props.locations.map(location => (
            <option key={location.id}>{location.place}, {location.cost} zł</option>
        ))) : locationOptaions = (
            <option>Brak dostępnych lokalizacji</option>
        );

        return (
            <div className="container">
                <div className="card card-body mt-4 mb-4">
                    <h2>Umów usługę</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleSelect1">Nazwa masażu, czas trwania i koszt</label>
                            <select className="form-control" id="exampleSelect1">
                                {serviceTypeOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleSelect1">Termin</label>
                            <select className="form-control" id="exampleSelect1">
                                {dateTimeOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleSelect1">Lokalizacja i koszt dojazdu</label>
                            <select className="form-control" id="exampleSelect1">
                                {locationOptaions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dodatkowe uwagi</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="message"
                                onChange={this.onChange}
                                value={this.state.message}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Umów
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    service_datetimes: state.services.service_datetimes,
    service_types: state.services.service_types,
    locations: state.services.locations
});

export default connect(mapStateToProps, { getDatetimes, getServices, getLocations, chooseAppointment })(ServiceList);