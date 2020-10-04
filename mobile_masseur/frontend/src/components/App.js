import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header';
import './App.css';

class App extends Component {
    render() {
        return (
            <div id="main">
                <Header />
                <main>
                    <div className="content">
                        <h1>Witaj wędrowcze</h1>
                    </div>
                </main>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));