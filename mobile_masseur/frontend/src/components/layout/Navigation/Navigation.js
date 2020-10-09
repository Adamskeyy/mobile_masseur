import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="brand-logo">MM</div>
                <ul>
                    <li className="nav-link"><Link to="/">Home</Link></li>
                    <li className="nav-link"><Link to="/dashboard">Umów usługę</Link></li>
                    <li className="nav-link"><a href="#">Cennik</a></li>
                    <li className="nav-link"><a href="#">Kontakt</a></li>
                    <li className="nav-link"><Link to="/login">Logowanie</Link></li>
                    <li className="nav-link"><Link to="/register">Rejestracja</Link></li>
                </ul>
            </nav>
        );
    };
};

export default Navigation
