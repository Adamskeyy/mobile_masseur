import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>MOBILNY MASAŻYSTA WOHOOO!!!!</h1>
                <img style={{ width: '600px' }} src="https://ocdn.eu/images/pulscms/YTM7MDA_/237b4f5678a36c96a3258215f8c93df2.jpg" alt="STONOGA" />
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));