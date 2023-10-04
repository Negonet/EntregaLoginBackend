import { Router } from "express";
import { products } from "../ProductManager.js";

const router = Router();

router.get('/api/products', async(req,res)=> {
    try {
        const prod = await products.getProducts(req.query);
        res.status(200).json({message:'Productos encontrados', prod});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.get('/api/products/:pid', async(req,res)=>{
    try {
        const prod = await products.getProductById(+req.params.pid);
        res.status(200).json({message:'Id Producto', prod});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.post ('/api/products', async (req,res) => {
    const { title, description, price, code, stock, category} = req.body

    if(!title || !description || !price || !code || !stock || !category){
        res.status(404).json({message:'Falta un dato'});
    }
    try {
        const crearProducto = await products.addNew(req.body)
        //console.log(crearProducto)
        res.status(200).json({message:'Producto creado', crearProducto});
    } catch (error) {
        res.status(500).json({message:err.message});
    }
});


router.put ('/api/products/:pid', async (req,res) => {
    try {
        const updated = await products.updateProduct(req.body)
        res.status(200).json({message:'Producto actualizado', updated});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.delete('/api/products/:pid', async (req,res) => {
    try {
        const idd = req.params.pid
        //console.log(idd)
        const deleted = await products.deleteProduct(+idd)
        //console.log(deleted)
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

export default router;