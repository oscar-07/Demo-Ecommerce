import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/modeloOrden.js';
import { isAuth } from '../utils.js';


//********************ESTO ES LA API */

const routerOrder = express.Router();

routerOrder.get('/mine', isAuth, expressAsyncHandler(async(req,res) =>{
    const orders = await Order.find({usuario: req.user._id});
    res.send(orders);
}));

routerOrder.post('/',isAuth, expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0 ){
        res.status(400).send({message: 'Esta vacio la orden'});
    }else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            //user: req.user._id,
            usuario: req.user._id,                  /*ojo aqui**********************/
        });
        const createdOrder = await order.save();
        res.status(201).send({message: "Nueva Orden Creada", order: createdOrder});
    }
}))


routerOrder.get('/:id', isAuth, expressAsyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Orden no encontrada'})
    }
}));

routerOrder.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Orden Pagada', order: updatedOrder });
    }else{
        res.status(404).send({message: 'Orden no encontrada'});
    }
}));

export default routerOrder;