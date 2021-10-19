import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";
//import * as axios from 'axios';

export const addToCart = (licorId, qty) => async(dispatch, getState)=>{
    //const {data} = await axios.get(`/api/licores/${licorId}`);
    const {data} = await Axios.get(`/api/licores/${licorId}`);
    //const { data } = await Axios.get(`/api/products/${productId}`);
    //console.log('cartAtions ',data)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            enStock: data.enStock,
            licor: data._id,
            qty,
        }
    });
    //console.log(' hola',JSON.parse(JSON.stringify( getState().cart.cartItems )))
    //console.log('sin modificacion',JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('cartItems', JSON.parse(JSON.stringify( getState().cart.cartItems )));
    //localStorage.setItem('cartItems',  JSON.stringify(getState().cart.cartItems));   //***************************************
    
};


export const removeFromCart = (licorId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: licorId});
    localStorage.setItem('cartItems', JSON.parse(JSON.stringify( getState().cart.cartItems )));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  };