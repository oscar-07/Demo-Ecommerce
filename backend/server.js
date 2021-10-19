import express from 'express';
//import data from './data.js';   //locales
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routerUsuario from './routers/routerUsuario.js';
import routerLicor from './routers/routerLicor.js';
import routerOrder from './routers/routerOrder.js';


dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//CONECTA CON LA BASE

mongoose.connect( process.env.MONGODB_URL',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
//    useCreateIndex: true,
});


/*
//valida la consulta del front a backend
app.get('/api/licores/:id',(req,res) =>{
    const licor = data.licores.find((x) => x._id === req.params.id);
    if(licor){
        res.send(licor);
    }else{
        res.status(404).send({message: 'Licor no encontrado'});
    }
});
 
//*********Pruebas locales**********

app.get('/api/licores', (req,res)=>{
    res.send(data.licores);
});
*/

app.use('/api/usuarios',routerUsuario);
app.use('/api/licores',routerLicor);
app.use('/api/orders',routerOrder);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/', (req, res)=>{
    res.send('Servidor listo');
});


app.use((err, req, res,next)=>{
    res.status(500).send({message: err.message});
});


//genera un puerto disponible o lo asigna
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Servidor conectado a: ${port}` )
})