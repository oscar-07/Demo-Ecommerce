import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import Checkout from '../components/Checkout'

export default function PantallaPasos(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    if(!userInfo){
        props.history.push('/ingresar');
    }
    const [fullName, setFullName]= useState(shippingAddress.fullName);
    const [address, setAddress]= useState(shippingAddress.address);
    const [city, setCity]= useState(shippingAddress.city);
    const [postalCode, setpostalCode]= useState(shippingAddress.postalCode);
    const [country, setCountry]= useState(shippingAddress.country);
    const dispatch = useDispatch();

    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(
            saveShippingAddress({fullName, address, city, postalCode, country}));
      props.history.push('/payment');
    };

    return (
        <div>
            <Checkout step1 step2></Checkout>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Datos </h1>
                </div>
                <div>
                    <label htmlFor="fullName">Nombre Completo</label>
                    <input type="text" id="fullName" placeholder="Prop. tu nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input> 
                </div>
                <div>
                    <label htmlFor="country">Pais</label>
                    <input type="text" id="country" placeholder="Prop. tu pais" value={country} onChange={(e) => setCountry(e.target.value)} required></input> 
                </div>
                <div>
                    <label htmlFor="city">Ciudad</label>
                    <input type="text" id="city" placeholder="Prop. tu ciudad" value={city} onChange={(e) => setCity(e.target.value)} required></input> 
                </div>
                <div>
                    <label htmlFor="address">Direccion</label>
                    <input type="text" id="address" placeholder="Prop. tu direccion" value={address} onChange={(e) => setAddress(e.target.value)} required></input> 
                </div>
                <div>
                    <label htmlFor="postalCode">Codigo postal</label>
                    <input type="text" id="postalCode" placeholder="Prop. tu codigo postal" value={postalCode} onChange={(e) => setpostalCode(e.target.value)} required></input> 
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Continuar
                    </button>
                </div>
                
            </form>
        </div>
    )
}
