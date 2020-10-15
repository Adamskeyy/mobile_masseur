import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDatetimes, getServices, getLocations, chooseAppointment } from '../../actions/services';

export class ServiceList extends Component {
    state = {
        service_datetimes: '',
        service_types: '',
        locations: '',
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

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { service_datetimes, service_types, locations, message } = this.state;
        const service = {
            "massage_type": parseInt(service_types),
            "massage_date_time": parseInt(service_datetimes),
            "comment": message,
            "massage_delivery": parseInt(locations),
            };
        this.props.chooseAppointment(service);
        this.setState({
            service_datetimes: '',
            service_types: '',
            locations: '',
            message: ''
        });
    };

    render() {
        let serviceTypeOptions;
        let dateTimeOptions;
        let locationOptaions;
        const { service_datetimes, service_types, locations } = this.props;

        service_types ? serviceTypeOptions = (this.props.service_types.map(type => (
            <option key={type.id} value={type.id} name="service_types">{type.name}, {type.duration} min, {type.cost} zł</option>
        ))) : serviceTypeOptions = (
            <option>Brak dostępnych usług</option>
        );

        service_datetimes.length ? dateTimeOptions = (this.props.service_datetimes.map(dateTime => (
            <option key={dateTime.id} value={dateTime.id} name="service_datetimes">{dateTime.date_time}</option>
        ))) : dateTimeOptions = (
            <option>Brak dostępnych terminów</option>
        );
        
        locations ? locationOptaions = (this.props.locations.map(location => (
            <option key={location.id} value={location.id} name="locations">{location.place}, {location.cost} zł</option>
        ))) : locationOptaions = (
            <option>Brak dostępnych lokalizacji</option>
        );

        return (
            <div className="container">
                <div className="card card-body mt-4 mb-4">
                    <h2>Umów usługę</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="serviceType">Nazwa masażu, czas trwania i koszt</label>
                            <select className="form-control" id="serviceType" name="service_types" value={this.state.service_types} onChange={this.handleChange}>
                                <option value="" disabled hidden>Wybierz...</option>
                                {serviceTypeOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateTime">Termin</label>
                            <select className="form-control" id="dateTime" name="service_datetimes" value={this.state.service_datetimes} onChange={this.handleChange}>
                                <option value="" disabled hidden>Wybierz...</option>
                                {dateTimeOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Lokalizacja i koszt dojazdu</label>
                            <select className="form-control" id="location" name="locations" value={this.state.locations} onChange={this.handleChange}>
                                <option value="" disabled hidden>Wybierz...</option>
                                {locationOptaions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dodatkowe uwagi</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="message"
                                onChange={this.handleChange}
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