import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import Usuario from '../models/modeloUsuario.js';
import { generateToken, isAuth } from '../utils.js';

const routerUsuario = express.Router();

routerUsuario.get('/seed', expressAsyncHandler( async (req, res)=>{
    //await Usuario.remove({});
    const creaUsuarios = await Usuario.insertMany(data.usuarios);
    res.send({creaUsuarios});
}));


//API
routerUsuario.post('/ingresar', expressAsyncHandler(async (req,res)=>{
    const usuario = await Usuario.findOne({email: req.body.email});
    if(usuario){
        if(bcrypt.compareSync(req.body.password, usuario.password)){
            res.send({
                _id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                isAdmin: usuario.isAdmin,
                token: generateToken(usuario),
            });
            return;
        }
    }
    res.status(401).send({message: 'Credenciales invalidas'}); 
})
);

routerUsuario.post('/registrar',expressAsyncHandler(async(req, res)=>{
    const usuario = new Usuario({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const crearUsuario = await usuario.save();
    res.send({
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
        token: generateToken(crearUsuario),
    })
}));

routerUsuario.get('/:id', expressAsyncHandler(async(req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    if(usuario){
        res.send(usuario);
    }else{
        res.status(404).send({message: 'Usuario no encontrado'});
    }
}));

routerUsuario.put('/profile', isAuth, expressAsyncHandler(async(req, res) =>{
    const usuario = await Usuario.findById(req.user._id);
    if(usuario){
        usuario.name = req.body.name || usuario.name;
        usuario.email = req.body.email || usuario.email;
        if(req.body.password){
            usuario.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await usuario.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })
    }
}))

export default routerUsuario;