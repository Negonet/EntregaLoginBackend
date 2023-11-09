import express from 'express'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { products } from './db/dao/ProductManager.js';
import './db/configDB.js'
import { Server } from 'socket.io';


// config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/views', viewsRouter);


const httpServer = app.listen(8080,()=>{
    console.log('listen!');
});


const socketServer = new Server(httpServer);

socketServer.on('connection', socket=> {
    console.log(`cliente conectado: ${socket.id}`);
    socket.on('newProduct', async (prod) => {
        const newProdList = await products.addNew(prod)
        socketServer.emit('addNew', newProdList);
    });
});