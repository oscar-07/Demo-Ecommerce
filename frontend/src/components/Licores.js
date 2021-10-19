import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function Licores(props) {
    const {licores}= props;
    return (
      <div key={licores._id} className="card">  {/* jala id*/}
          <Link to={`/licores/${licores._id}`}>   {/* referencia */}
            <img className="medio" src={licores.image} alt={licores.name} />  {/* jala imagen y jala nombre */}
          </Link>
          <div className="card-body">
            <Link to={`/licores/${licores._id}`}>
              <h2>{licores.name}</h2>
            </Link>
            <Rating rating={licores.rating} numReviews={licores.numReviews}></Rating>
            <div className="precio">
              ${licores.price}
            </div>
          </div>
      </div>
    );
}
