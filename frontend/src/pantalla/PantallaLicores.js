import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function PantallaLicores(props) {
    const dispatch = useDispatch();
    const licorId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector( (state) => state.productDetails);    ///////****************** state
    ///console.log(productDetails);        //MARCA ERROR
    const {loading, error, licores } = productDetails;
    //console.log("error", licores);      //MARCA ERROR
    
    useEffect(() =>{
        dispatch(detailsProduct(licorId));
    }, [dispatch, licorId]);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${licorId}?qty=${qty}`);
    };
    return (
        <div>
          {loading? (<LoadingBox></LoadingBox>  // muestra carga
          ) : error? (<MessageBox variant="danger">{error}</MessageBox> //muestra error
          ) : (
    <div>
        <Link to="/">Regresar a los resultados</Link>
        <div className="row top">
            <div className="col-2">
                <img src={licores.image} className="large" alt={licores.name}></img>
            </div>
            <div className="col-1">
                <ul>
                    <li>
                        <h1>{licores.name}</h1>
                    </li>
                    <li>
                        <Rating
                            rating={licores.rating}
                            numReviews={licores.numReviews}
                        ></Rating>
                    </li>
                    <li>
                        Price: ${licores.price}
                    </li>
                    <li>
                        Descripcion: {licores.descripcion}
                    </li>
                </ul>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <div className="row">
                                <div>
                                    Precio
                                </div>
                                <div className="price">
                                    ${licores.price}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    Estado
                                </div>
                                <div>
                                    {licores.enStock > 0 ? ( 
                                    <span className="success"> En Stock</span>) : (
                                    <span className="danger"> No disponible</span>)}
                                </div>
                            </div>
                        </li>
                            {
                                licores.enStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(licores.enStock).keys()].map((x) =>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                        <li>
                            <button onClick={addToCartHandler} className="primary block">Agregar al carrito</button>
                        </li>
                                    </>

                                ) 
                            }
                    </ul>
                </div>
            </div>
        </div>
    </div>
          )}
        </div>
    );
}
