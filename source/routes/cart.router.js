import { Router } from "express";
import { carrito } from "../CartManager.js";


const router = Router()

router.get('/', async(req,res)=> {
    
    try {
        const cart = await carrito.getCart()
        res.status(200).json({message:'El carrito contiene', cart});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.post('/', async (req,res)=> {
    try {
        //console.log(req.body)
        const newCart = await carrito.createCart(req.body)
        res.status(200).json({message:'El nuevo carrito contiene', newCart});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})




export default router;