import { Router } from "express";
import { products } from "../db/dao/ProductManagerDB.js";
const router = Router();


router.get('/home', async(req,res)=> {
    try {
        const prod = await products.getProducts(req.query);
        //console.log(prod)
        res.render('home',{
            prod: prod.info.payload.map(prod => prod.toJSON())});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.get('/products', async(req,res)=> {
    try {
        const prod = await products.getProducts(req.query);
        //console.log(prod)
        res.render('products',{
            prod: prod.info.payload.map(prod => prod.toJSON())});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.get('/addProd' , (req,res) => {

    res.render('addProd')
});

router.get('/home/:idProd', async (req, res) => {

    const {idProd} = req.params;
    try {
        const product = await products.getProductById(+idProd);
        res.render('productAdded', {product})
    } catch (err) {
        
    }

});

router.get('/realTimeProducts', async (req, res) => {
    
    res.render('realTimeProducts');
    
});

router.get('/chat', async (req, res) => {
    res.render('chat');
})


export default router;



