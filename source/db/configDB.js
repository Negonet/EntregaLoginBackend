import mongoose from "mongoose";


const URI = "mongodb+srv://dbuser01:DBUSER_01@cluster01.ok8xbcv.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose
.connect(URI)
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.log(error));