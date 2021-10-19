import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/usersActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/usersConstants';

export default function PantallaPerfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, usuario } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {
    if (!usuario) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
        }else{
            setName(usuario.name);
            setEmail(usuario.email);
        }
    }, [dispatch, userInfo._id, usuario]);
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Error de comparacion')
        }else{
            dispatch(updateUserProfile({userId: usuario._id, name, email, password}))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Perfil de usuario</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                        <MessageBox variant="success">
                            Perfil actualizado correctamente
                        </MessageBox>
                    )}
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input id="name" type="text" placeholder="Prop. tu nombre" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Correo</label>
                            <input id="email" type="email" placeholder="Prop. tu correo" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input id="password" type="password" placeholder="Prop. tu contraseña" onChange={(e) => setPassword(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <input id="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label/>
                                <button className="primary" type="submit">
                                    Actualizar
                                </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
    
}
