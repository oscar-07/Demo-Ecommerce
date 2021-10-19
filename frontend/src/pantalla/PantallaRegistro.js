import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { registrar } from '../actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function PantallaRegisto(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

                                            //parte la direccion
    const redirect = props.location.search ? props.location.search.split('=')[1]:'/'; 
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler= (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Error de credenciales...');
        }else{
            dispatch(registrar(name, email, password));
        }////todo el dar de alta
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
                        Registrar
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Tu nombre</label>
                    <input type="text" id="name" placeholder="Ingresa tu nombre" required onChange={(e)=> setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Correo Electronico</label>
                    <input type="email" id="email" placeholder="Prop. Tu correo" required onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Prop. Tu contraseña" required onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Contraseña</label>
                    <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" required onChange={(e)=> setconfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Registrar
                    </button>
                </div>
                <div>
                    <label/>
                    <div> ¿Ya tienes una cuenta?
                    <Link to={`/ingresar?redirect=${redirect}`}>Inicar secion</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
