import express from 'express'
import { products } from './ProductManager.js';

const app = express();
app.use(express.json());

app.get('/products', async(req,res)=> {
    try {
        const prod = await products.getProducts(req.query);
        res.status(200).json({message:'Productos encontrados', prod});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
})

app.get('/products/:pid', async(req,res)=>{
    try {
        const prod = await products.getProductById(+req.params.pid);
        res.status(200).json({message:'Id Producto', prod});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
})

app.post ('/products', async (req,res) => {
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
})


app.put ('/:pid')

app.listen(8080,()=>{
    console.log('listen!');
})
