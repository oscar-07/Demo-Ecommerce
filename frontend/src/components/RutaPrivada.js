import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function RutaPrivada({component: Component, ...rest}) {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo } = userSignin;
    return (
        <Route 
            {...rest}
            render={(props) =>
                userInfo ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/ingresar" />
                )
            } 
        ></Route>
    )
}
