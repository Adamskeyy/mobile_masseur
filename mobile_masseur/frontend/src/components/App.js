import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './layout/Navigation/Navigation';
import Dashboard from './persons/Dashboard';
import Alerts from './layout/Alerts';
import Footer from './layout/Footer/Footer';
import Tiles from './layout/Tiles/Tiles';
import Appointments from '../services/Appointments';
import Login from './Accounts/Login';
import Register from './Accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Prices from './layout/Prices/Prices';
import About from './layout/About/About';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

// Alert options
const alertOptions = {
    timeout: 3000,
    position: 'middle'
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <div id="main">
                            <Navigation />
                            <Alerts />
                            <Switch>
                                <Route exact path='/' component={Tiles} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/login' component={Login} />
                                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                                {/* <PrivateRoute exact path='/apointments' component={Appointments} /> */}
                            </Switch>
                            <Footer />
                        </div>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    };
};

ReactDOM.render(<App />, document.getElementById('app'));