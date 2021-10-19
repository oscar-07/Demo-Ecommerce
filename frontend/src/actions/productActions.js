//import * as axios from 'axios';
import Axios from 'axios';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST,         //ES UNA PETICION CORRECTA
    });
    try {
        const { data } = await Axios.get('/api/licores');  //OJO A LOS AXIOS
        //const { data } = await axios.get('/api/licores');  //OJO A LOS AXIOS
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message}); //error lo trae desde PRODUCT REDUCERS
    }
};

export const detailsProduct = (licorID) => async (dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: licorID});
    try {
        //const {data} = await axios.get(`/api/licores/${licorID}`);    //OJO A LOS AXIOS
        const {data} = await Axios.get(`/api/licores/${licorID}`);    //OJO A LOS AXIOS
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({  
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message
            : error.message,
        });
    }
};