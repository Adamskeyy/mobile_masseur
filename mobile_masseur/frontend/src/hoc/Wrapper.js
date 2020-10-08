import React from 'react';
import './Wrapper.css';

const Wrapper = (WrappedComponent) => {
    return (props) => (
        <div className="wrapper">
            <WrappedComponent {...props} />
        </div>
    );
};

export default Wrapper;
