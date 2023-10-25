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
        const readCart = await carrito.createCart(req.body)
        res.status(200).json({message:'El nuevo carrito contiene', readCart});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})


router.get('/:cid', async(req,res)=>{
    try {
        const cart = await carrito.searchCart(+req.params.cid);
        res.status(200).json({message:'Carrito', cart});
    } catch (err) {
        res.status(500).json({message:err.message});
    }

})



export default router;