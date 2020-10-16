import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDatetimes, getServiceTypes, getLocations, chooseAppointment } from '../../actions/services';

export class ServiceList extends Component {
    state = {
        service_datetime: '',
        service_type: '',
        location: '',
        comment: ''
    };

    static propTypes = {
        chooseAppointment: PropTypes.func.isRequired,
        getDatetimes: PropTypes.func.isRequired,
        getServiceTypes: PropTypes.func.isRequired,
        getLocations: PropTypes.func.isRequired
    };

    static getDerivedStateFromProps(nextProps, { service_datetime, service_type, location }) {
        const isFormUnset = [service_datetime, service_type, location]
            .every(el => el.length === 0);
        if (nextProps.isDataReady && isFormUnset) {
            return {
                service_datetime: `${nextProps.service_datetimes[0].id}`,
                service_type: `${nextProps.service_types[0].id}`,
                location: `${nextProps.locations[0].id}`
            };
        }
        return null;
    };

    // componentdidupdate po wysłaniu formularza -> "wyzerować selecty"

    componentDidMount() {
        this.props.getDatetimes();
        this.props.getServiceTypes();
        this.props.getLocations();
    };

    handleChange = e => {
        this.setState({ [e.target.name]: (e.target.value) }, () => {
            console.log(this.state);
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { service_datetime, service_type, location, comment } = this.state;
        const service = {
            "massage_type": +service_type, // js spróbuje skonwertować do liczby, !!do boola
            "massage_date_time": +service_datetime,
            "comment": comment,
            "massage_delivery": +location,
        };
        console.log('service', service);
        console.log('state', this.state);
        this.props.chooseAppointment(service);
        // reewaluacja selectów
        this.setState({
            service_datetime: '',
            service_type: '',
            location: '',
            comment: ''
        });
    };

    render() {
        const { service_datetimes, service_types, locations } = this.props;

        const renderedServiceTypes = service_types ? (this.props.service_types.map(type => (
            <option key={type.id} value={type.id} name="service_type">{type.name}, {type.duration} min, {type.cost} zł</option>
        ))) : (
            <option>Brak dostępnych usług</option>
        );

        const renderedDateTimes = service_datetimes.length ? (this.props.service_datetimes.map(dateTime => (
            <option key={dateTime.id} value={dateTime.id} name="service_datetime">{dateTime.date_time}</option>
        ))) : (
            <option>Brak dostępnych terminów</option>
        );
        
        const renderedLocations = locations ? (this.props.locations.map(location => (
            <option key={location.id} value={location.id} name="location">{location.place}, {location.cost} zł</option>
        ))) : (
            <option>Brak dostępnych lokalizacji</option>
        );

        return (
            <div className="container">
                <div className="card card-body mt-4 mb-4">
                    <h2>Umów usługę</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="serviceType">Nazwa masażu, czas trwania i koszt</label>
                            <select className="form-control" id="serviceType" name="service_type" value={this.state.service_type} onChange={this.handleChange}>
                                {renderedServiceTypes}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateTime">Termin</label>
                            <select className="form-control" id="dateTime" name="service_datetime" value={this.state.service_datetime} onChange={this.handleChange}>
                                {renderedDateTimes}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Lokalizacja i koszt dojazdu</label>
                            <select className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleChange}>
                                {renderedLocations}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dodatkowe uwagi</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="comment"
                                onChange={this.handleChange}
                                value={this.state.comment}
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

const mapStateToProps = ({services: { service_datetimes, service_types, locations }}) => ({
    service_datetimes,
    service_types,
    locations,
    isDataReady: [service_datetimes, service_types, locations]
        .every(el => el.length > 0)
});

export default connect(mapStateToProps, { getDatetimes, getServiceTypes, getLocations, chooseAppointment })(ServiceList);