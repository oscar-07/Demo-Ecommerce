import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PantallaLicores from './pantalla/PantallaLicores';
import PantallaHome from './pantalla/PantallaHome';
import PantallaCart from './pantalla/PantallaCart';
import { useDispatch, useSelector } from 'react-redux';
import PantallaIngresar from './pantalla/PantallaIngresar';
import PantallaRegistro from './pantalla/PantallaRegistro';
import { salir } from './actions/usersActions';
import PantallaPasos from './pantalla/PantallaPasos';
import PantallaMetodoPago from './pantalla/PantallaMetodoPago';
import PantallaPedido from './pantalla/PantallaPedido';
import PantallaOrden from './pantalla/PantallaOrden';
import PantallaOrderHistorial from './pantalla/PantallaOrderHistorial';
import PantallaPerfil from './pantalla/PantallaPerfil';
import RutaPrivada from './components/RutaPrivada';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } =cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const salirHandler = () =>{
    dispatch(salir());
  }


  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">CavaDelOso</Link>
        </div>
        <div>
          <Link to="/cart">Tarjeta
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
            )}
          </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>   
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Perfil de usuario</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Historial de Ordenes</Link>
                    </li>
                    <li>
                    <Link to="#salir" onClick={salirHandler}>
                      Salir
                    </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/ingresar">Ingresar</Link>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/listas">Listas</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={PantallaCart}></Route>
        <Route path="/licores/:id" component={PantallaLicores}></Route>
        <Route path="/ingresar" component={PantallaIngresar}></Route>
        <Route path="/registrar" component={PantallaRegistro}></Route>
        <Route path="/shipping" component={PantallaPasos}></Route>
        <Route path="/payment" component={PantallaMetodoPago}></Route>
        <Route path="/placeorder" component={PantallaPedido}></Route>
        <Route path="/order/:id" component={PantallaOrden}></Route>
        <Route path="/orderhistory" component={PantallaOrderHistorial}></Route>
        <RutaPrivada path="/profile" component={PantallaPerfil}></RutaPrivada>
        <Route path="/" component={PantallaHome} exact></Route>
      </main>
      <footer className="row center">Mi primer ecommerce</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
