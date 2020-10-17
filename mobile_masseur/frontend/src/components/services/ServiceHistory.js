import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPersons, deletePerson } from '../../actions/persons';

export class ServiceHistory extends Component {
    static propTypes = {
        persons: PropTypes.array.isRequired,
        getPersons: PropTypes.func.isRequired,
        deletePerson: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getPersons();
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
                        <tbody>
                            {this.props.persons.map(person => (
                                <tr key={person.id}>
                                    <td>{person.id}</td>
                                    <td>{person.name}</td>
                                    <td>{person.email}</td>
                                    <td>{person.message}</td>
                                    <td>{person.message}</td>
                                    <td><button onClick={this.props.deletePerson.bind(this, person.id)} className="btn btn-danger btn-sm">Odwołaj</button></td>
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
    persons: state.persons.persons
});

export default connect(mapStateToProps, { getPersons, deletePerson })(ServiceHistory);
