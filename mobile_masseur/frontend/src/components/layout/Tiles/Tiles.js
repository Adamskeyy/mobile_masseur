import React from 'react';
import Wrapper from '../../../hoc/Wrapper';
import './Tiles.css';
import wave from './wave.jpg';

const Tiles = () => {

    return (
        <div className="tiles">
            <div className="title">
                <h1>Mobliny Masażysta Trójmiasto</h1>
            </div>
            <div className="img-conatiner">
                <img src={wave} alt="Placeholder alt" />
            </div>
            <div className="tiles-grid">
                <div className="service service1"><a className="tile-link" href="#">Usługa 1</a></div>
                <div className="service service2"><a className="tile-link" href="#">Usługa 2</a></div>
                <div className="service service3"><a className="tile-link" href="#">Usługa 3</a></div>
                <div className="service service4"><a className="tile-link" href="#">Usługa 4</a></div>
                <div className="service service5"><a className="tile-link" href="#">Usługa 5</a></div>
            </div>
        </div>
    )
}

export default Wrapper(Tiles);
