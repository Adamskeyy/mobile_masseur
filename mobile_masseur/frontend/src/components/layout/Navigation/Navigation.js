import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import './Navigation.css';

class Navigation extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <li className="nav-link"><button onClick={this.props.logout} className="nav-link btn btn-outline-primary btn-sm">Wyloguj</button></li>
        );

        const guestLinks = (
            <>
                <li className="nav-link"><Link to="/login">Logowanie</Link></li>
                <li className="nav-link"><Link to="/register">Rejestracja</Link></li>
            </>
        );

        return (
            <nav className="nav-bar">
                <div className="brand-logo">MM</div>
                <ul>
                    <li className="nav-link"><Link to="/">Home</Link></li>
                    <li className="nav-link"><Link to="/dashboard">Umów usługę</Link></li>
                    <li className="nav-link"><a href="#">Cennik</a></li>
                    <li className="nav-link"><a href="#">Kontakt</a></li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </nav>
        );
    };
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navigation);
