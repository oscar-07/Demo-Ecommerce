import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import Checkout from '../components/Checkout';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';


export default function PantallaPedido(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;                   /*----------- */
    
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a,c) => a + c.qty * c.price,0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0): toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    
                                            /*revisar */
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div>
            <Checkout step1 step2 step3 step4></Checkout>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Compras</h2>
                                <p>
                                    <strong>Nombre: </strong>{cart.shippingAddress.fullName} <br/>
                                    <strong>Direccion: </strong>
                                    {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, 
                                    {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p> 
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Metodo de Pago</h2>
                                <p>
                                    <strong>Metodo: </strong> {cart.paymentMethod}
                                </p> 
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                            <h2>Articulos</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                                    {item.qty} x  ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Orden de compra</h2>
                            </li>
                            <li>
                                <div className="row">
                                        <div>Articulos</div>
                                        <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                        <div>Compras</div>
                                        <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                        <div>iva</div>
                                        <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            ${cart.totalPrice.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}> Generar Orden</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
