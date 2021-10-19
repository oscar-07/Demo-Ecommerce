import React, { useEffect } from 'react'
import Licores from '../components/Licores';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';



export default function PantallaHome() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, licores } = productList;

  useEffect(() =>{   
    dispatch(listProducts());
  },[dispatch]);

    return (
        <div>
          {loading? (<LoadingBox></LoadingBox>  // muestra carga
          ) : error? (<MessageBox variant="danger">{error}</MessageBox> //muestra error
          ) : (
          
          <div className="row center">
            {licores.map((licores) => (     //aqui jala toda la base para todos
              <Licores key={licores._id} licores={licores} ></Licores>
            ))}
          </div>
          )}
        </div>
    );
}
