import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function PantallaCart(props){
    const licorId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;
    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(()=>{
      if(licorId){
        dispatch(addToCart(licorId,qty));
      }
    },[dispatch, licorId, qty]);

    const removeFromCartHandler = (id) =>{
      dispatch(removeFromCart(id));
    };
    const checkoutHandler = () =>{
      props.history.push('/ingresar?redirect=shipping')
    }
    //console.log(cartItems)
    return(
      <div className="row top">
        <div className="col-2">
          <h1>Lista de compras</h1>
          {cartItems.length === 0 ? (
          <MessageBox>
            Lista vacia. <Link to="/">Ir de compras</Link>
          </MessageBox>
          ):(
            <ul>
              {cartItems.map((item) => (
                  /*Aqui lo cambie licores        linea 48 cambie de {`/licores/${item.licores a    licor    }`}*/    
                <li key={item.licor}>
                  <div className="row">
                    <div>
                      <img src={item.image}
                      alt={item.name}
                      className="small">
                      </img>
                    </div>
                    <div className="min-30">         
                        <Link to={`/licores/${item.licor}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select value={item.qty} onChange={(e)=> dispatch(addToCart(item.licor, Number(e.target.value)))}>
                      {[...Array(item.enStock).keys()].map((x) =>(
                              <option key={ x + 1 } value={ x + 1 } > {x + 1}</option>
                          ))}
                      </select>
                    </div>
                    <div>
                      ${item.price}
                    </div>
                    <div>
                      <button type="button" onClick={() => removeFromCartHandler(item.licor)}>Borrar</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button type="button" onClick={checkoutHandler} className="primary block"  disabled={cartItems.length === 0}>Procesar</button>
              </li>
            </ul>
          </div>
        </div>
      </div>  
    );
}