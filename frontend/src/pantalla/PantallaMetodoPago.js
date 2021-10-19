import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import Checkout from '../components/Checkout'

export default function PantallaMetodoPago(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress){
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }
    return (
        <div>
            <Checkout step1 step2 step3></Checkout>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Metodo de pago</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="stripe">Transferencia</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    )
}
