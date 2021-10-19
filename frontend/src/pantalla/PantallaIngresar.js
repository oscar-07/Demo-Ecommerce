import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { ingresar } from '../actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function PantallaIngresar(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

                                            //parte la direccion
    const redirect = props.location.search ? props.location.search.split('=')[1]:'/'; 
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler= (e) =>{
        e.preventDefault();
        dispatch(ingresar(email, password));
        ////todo el dar de alta
    };
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        } 
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" on onSubmit = {submitHandler}>
                <div>
                    <h1>
                        Ingresar
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Correo Electronico</label>
                    <input type="email" id="email" placeholder="Prop. Tu correo" required onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Prop. Tu contraseña" required onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Ingresar
                    </button>
                </div>
                <div>
                    <label/>
                    <div>¿Eres cliente nuevo? {''}
                    <Link to={`/registrar?redirect=${redirect}`}>Crear cuenta</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
