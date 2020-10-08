import React, { Component } from 'react';
import './Navigation.css';

export class Header extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="brand-logo">MM</div>
                <ul>
                    <li className="nav-link"><a href="#">Home</a></li>
                    <li className="nav-link"><a href="#">Umów usługę</a></li>
                    <li className="nav-link"><a href="#">Cennik</a></li>
                    <li className="nav-link"><a href="#">Kontakt</a></li>
                    <li className="nav-link"><a href="#">Logowanie/Rejestracja</a></li>
                </ul>
            </nav>
        )
    }
}

export default Header
