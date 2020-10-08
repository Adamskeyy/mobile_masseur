import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './layout/Navigation/Navigation';
import Dashboard from './users/Dashboard';
import Alerts from './layout/Alerts';
import Footer from './layout/Footer/Footer';
import Tiles from './layout/Tiles/Tiles';
import Prices from './layout/Prices/Prices';
import About from './layout/About/About';
import './App.css';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from '../store';

// Alert options
const alertOptions = {
    timeout: 3000,
    position: 'middle'
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <div id="main">
                        <Fragment>
                            <Navigation />
                            <Tiles />
                            <Alerts />
                            <Dashboard />
                            <Footer />
                        </Fragment>
                    </div>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));