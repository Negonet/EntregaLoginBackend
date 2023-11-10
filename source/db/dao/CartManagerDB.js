import { cartsModel } from '../models/carts.model.js';

class CartManager {
    
    async createCart(){
        
        const newCart = { products: []};
        const addCartDB = await cartsModel.create(newCart);
        return addCartDB
    }; 


    async searchCart(id) {
        
        try {
            const readCart = await cartsModel.findById(id);
            if (readCart) {
                return readCart   
            } else {
            console.log('Carrito no encontrado')
            }            

        } catch (error) {
            
    }};


    async updateCart (idCart, Prod) {
        
        try {
            const readCart = await cartsModel.findById(idCart)

            const ifInCart = readCart.products.findIndex((p) => p.product === Prod)
            
            
            if ( ifInCart ===-1 ) {
                readCart.products.push({product: Prod, quantity: 1});
               
            }   else{
                readCart.products[ifInCart].quantity++;
            }

            await readCart.save();
        } catch (err) {
            return err
        }
    }


}




export const carrito = new CartManager();