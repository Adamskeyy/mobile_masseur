import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './layout/Navigation/Navigation';
import Footer from './layout/Footer/Footer';
import Tiles from './layout/Tiles/Tiles';
import Prices from './layout/Prices/Prices';
import About from './layout/About/About';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="main">
                    <Navigation />
                    <Route exact path="/" component={Tiles} />
                    <Route path="/prices" component={Prices} />
                    <Route path="/about" component={About} />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));