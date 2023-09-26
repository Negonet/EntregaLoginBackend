import express from 'express'
import { products } from './ProductManager.js';

const app = express()

app.get('/products', async(req,res)=> {
    const prod = await products.getProducts()
    res.json({message:'Productos encontrados', prod})
})

app.get('/products/:id', async(req,res)=>{
    const {id} = req.params
    const prod = await products.getProductById(+id)
    res.json({message:'Id Producto', prod})
})



app.listen(8080,()=>{
    console.log('listen!')
})
