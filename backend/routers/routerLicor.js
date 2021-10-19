import express from 'express';
import Licor from '../models/modeloLicores.js';
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js';

const routerLicor = express.Router();



routerLicor.get('/', expressAsyncHandler(async(req,res) =>{
    const licores = await Licor.find({});
    res.send(licores);
}));


routerLicor.get('/seed', expressAsyncHandler (async(req,res) =>{
    //await Licor.remove({});
    const crearLicores = await Licor.insertMany(data.licores);
    res.send({ crearLicores});
})
);

routerLicor.get('/:id', expressAsyncHandler(async (req,res) =>{
    const licor = await Licor.findById(req.params.id);
    if(licor){
        res.send(licor);
    }else{
        res.status(404).send({messaje: 'Licor no encontrado'});
    }
}));

export default routerLicor;